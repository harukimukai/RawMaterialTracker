using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RawMaterialTracker.Migrations
{
    /// <inheritdoc />
    public partial class AddMinKeepSizeToMaterial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "MinKeepSize",
                table: "Materials",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MinKeepSize",
                table: "Materials");
        }
    }
}
