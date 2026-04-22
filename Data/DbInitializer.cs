using Microsoft.EntityFrameworkCore;
using RawMaterialTracker.Models;

namespace RawMaterialTracker.Data
{
    public static class DbInitializer
    {
        public static void Initialize(RawMaterialContext context)
        {
            context.Database.Migrate();

            if (context.Materials.Any()) return;

            var aluminum = new Material
            {
                MaterialName = "Aluminum",
                Thickness = 0.100,
                ThicknessLabel = "0.100\"",
                StandardLength = 120.0,
                StandardWidth = 48.0
            };
            var mild = new Material
            {
                MaterialName = "Mild",
                Thickness = 0.100,
                ThicknessLabel = "12g",
                StandardLength = 120.0,
                StandardWidth = 48.0
            };

            context.Materials.AddRange(aluminum, mild);
            context.SaveChanges();

            var stocks = new StockItem[]
            {
                new StockItem
                {
                    MaterialId = aluminum.Id,
                    Length = 120.0, Width = 48.0,
                    Quantity = 5, Status = "Available",
                    Location = "Rack-A1"
                },
                // 45インチの端材（キープ対象）
                new StockItem { 
                    MaterialId = aluminum.Id, 
                    Length = 45.0, Width = 48.0, 
                    Quantity = 2, Status = "Available", Location = "Remnant-Shelf-1" 
                },
                // 6インチの端材（5インチ・ルールのテスト用）
                new StockItem { 
                    MaterialId = aluminum.Id, 
                    Length = 6.0, Width = 48.0, 
                    Quantity = 1, Status = "Available", Location = "Remnant-Shelf-1" 
                },
                // フルサイズのステンレス
                new StockItem { 
                    MaterialId = mild.Id, 
                    Length = 120.0, Width = 60.0, 
                    Quantity = 3, Status = "Available", Location = "Rack-B2" 
                }
            };

            context.StockItems.AddRange(stocks);
            context.SaveChanges();
        }
    }
}
