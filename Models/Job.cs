namespace RawMaterialTracker.Models
{
    public class Job
    {
        public int Id { get; set; }
        public string JobNumber { get; set; } = string.Empty;
        public string ProgramName { get; set; } = string.Empty;
        public string PartNumber { get; set; } = string.Empty;

        // Which material is needed
        public int MaterialId { get; set; }
        public Material? Material { get; set; }

        
        public double RequiredLength { get; set; }
        public double RequiredWidth { get; set; } = 48.0;

        public int PartQuantity { get; set; }

        public bool IsCompleted { get; set; } = false;
    }
}