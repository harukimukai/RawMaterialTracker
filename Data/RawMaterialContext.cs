using Microsoft.EntityFrameworkCore;
using RawMaterialTracker.Models;

namespace RawMaterialTracker.Data
{
    public class RawMaterialContext : DbContext
    {
        public RawMaterialContext(DbContextOptions<RawMaterialContext> options) : base(options)
        {
        }

        public DbSet<Material> Materials { get; set; } = default!;
        public DbSet<StockItem> StockItems { get; set; } = default!;
        public DbSet<Job> Jobs { get; set; } = default!;
    }
}