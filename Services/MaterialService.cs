using RawMaterialTracker.Models;
using RawMaterialTracker.Data;
using Microsoft.EntityFrameworkCore;

namespace RawMaterialTracker.Services;

public class MaterialService
{
    public readonly RawMaterialContext _context;

    public MaterialService(RawMaterialContext context)
    {
        _context = context;
    }

    public async Task<List<Material>> GetAll()
    {
        return await _context.Materials.ToListAsync();
    }

    public async Task<Material?> Get(int id)
    {
        return await _context.Materials.FindAsync(id);
    }

    public async Task Add(Material material)
    {
        bool isDuplicate = await _context.Materials.AnyAsync(m => 
            m.MaterialName == material.MaterialName && m.Thickness == material.Thickness
        );
        if (isDuplicate)
        {
            throw new InvalidOperationException($"{material.MaterialName}({material.ThicknessLabel}) is already registered.");
        }
        _context.Materials.Add(material);
        await _context.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
        var material = await _context.Materials.FindAsync(id);
        if (material is null) return;

        bool hasStock = await _context.StockItems.AnyAsync(s => s.MaterialId == id);
        bool hasJob = await _context.Jobs.AnyAsync(j => j.MaterialId == id);

        if (hasStock || hasJob)
        {
            throw new InvalidOperationException("Cannot be deleted because it is currently in stock or scheduled for use.");
        }

        _context.Materials.Remove(material);
        await _context.SaveChangesAsync();
    }

    public async Task Update(Material material)
    {
        _context.Materials.Update(material);
        await _context.SaveChangesAsync();
    }
}