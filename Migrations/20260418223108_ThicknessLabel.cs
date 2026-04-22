using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RawMaterialTracker.Migrations
{
    /// <inheritdoc />
    public partial class ThicknessLabel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ThicknessLabel",
                table: "Materials",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ThicknessLabel",
                table: "Materials");
        }
    }
}
