namespace RawMaterialTracker.Models
{
    public class StockItem
    {
        public int Id { get; set; }

        public int MaterialId { get; set; }
        public Material? Material { get; set; }

        public double Length { get;  set; }
        public double Width { get; set; }

        public int Quantity { get; set; }

        //"Available", "Reserved", "PendingScrap"
        public string Status { get; set; } = "Available";

        public string Location { get; set; } = string.Empty;

        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}