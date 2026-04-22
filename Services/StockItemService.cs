using Microsoft.EntityFrameworkCore;
using RawMaterialTracker.Data;
using RawMaterialTracker.Models;

namespace RawMaterialTracker.Services;

public class StockItemService
{
    private readonly RawMaterialContext _context;

    public StockItemService(RawMaterialContext context)
    {
        _context = context;
    }

    public async Task<List<StockItem>> GetAll()
    {
        return await _context.StockItems
            .Include(s => s.Material)
            .ToListAsync();// 重要！素材名や厚みも一緒に取ってくる
    }

    public async Task<StockItem?> Get(int id)
    {
        return await _context.StockItems
            .Include(s => s.Material)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task Add(StockItem item)
    {
        var existingItem = await _context.StockItems.FirstOrDefaultAsync(s =>
            s.MaterialId == item.MaterialId &&
            s.Length == item.Length &&
            s.Width == item.Width
        );

        if (existingItem is not null)
        {
            existingItem.Quantity += item.Quantity;
            Console.WriteLine($"Added Quantity: {item.Quantity} to Existing Stock (ID: {existingItem.Id}).");
        }
        else
        {
            var material = await _context.Materials.FindAsync(item.MaterialId);

            double threshold = material?.MinKeepSize ?? 5.0;

            bool isSmallRemnant = item.Length <= threshold || item.Width <= threshold;

            if (isSmallRemnant)
            {
                var fittingJob = await _context.Jobs
                    .Where(j => !j.IsCompleted && j.MaterialId == item.MaterialId)
                    .Where(j => j.RequiredLength <= item.Length && j.RequiredWidth <= item.Width)
                    .FirstOrDefaultAsync();

                if (fittingJob is null)
                {
                    item.Status = "PendingScrap";
                }
                else
                {
                    item.Status = "Available";
                    item.Location = "Priority-Remnant";
                }
            }

            _context.StockItems.Add(item);
        }
        await _context.SaveChangesAsync();
    }

    public async Task Update(StockItem item)
    {
        _context.Update(item);
        await _context.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
        var item = await _context.StockItems.FindAsync(id);
        if (item is not null)
        {
            _context.StockItems.Remove(item);
            await _context.SaveChangesAsync();
        }

    }
}