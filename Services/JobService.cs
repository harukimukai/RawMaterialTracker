using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RawMaterialTracker.Data;
using RawMaterialTracker.Models;
using SQLitePCL;

namespace RawMaterialTracker.Services
{
    public class JobService
    {
        private readonly RawMaterialContext _context;
        
        public JobService(RawMaterialContext context)
        {
            _context = context;
        }

        public async Task<List<Job>> GetActiveJobs()
        {
            return await _context.Jobs
                .Where(j => !j.IsCompleted)
                .Include(j => j.Material)
                .ToListAsync();
        }

        public async Task<Job?> Get(int id)
        {
            return await _context.Jobs.FindAsync(id);
        }

        public async Task Add(Job job)
        {
            bool isDuplicate = await _context.Jobs.AnyAsync(j => j.JobNumber == job.JobNumber);

            if (isDuplicate)
            {
                throw new InvalidOperationException($"{job.JobNumber}({job.PartNumber}: {job.PartQuantity}PCS) is already registered.");
            }
            
            _context.Jobs.Add(job);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Job job)
        {
            _context.Jobs.Update(job);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var job = await _context.Jobs.FindAsync(id);
            if (job is null) return;

            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();
        }
    }
}