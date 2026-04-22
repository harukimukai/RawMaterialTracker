namespace RawMaterialTracker.Models
{
    public class Material
    {
        public int Id { get; set; }
        public string MaterialName {get; set; } = string.Empty;
        public double Thickness { get;  set; }
        public string ThicknessLabel { get; set; } = string.Empty;

        public double StandardLength { get; set; }
        public double StandardWidth { get; set; }

        public double MinKeepSize { get; set; } = 5.0;

        public List<StockItem> StockItems { get; set; } = new();
    }
}