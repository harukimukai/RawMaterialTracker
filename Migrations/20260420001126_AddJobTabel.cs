using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RawMaterialTracker.Migrations
{
    /// <inheritdoc />
    public partial class AddJobTabel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "Jobs",
                newName: "PartQuantity");

            migrationBuilder.AddColumn<string>(
                name: "JobNumber",
                table: "Jobs",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JobNumber",
                table: "Jobs");

            migrationBuilder.RenameColumn(
                name: "PartQuantity",
                table: "Jobs",
                newName: "Quantity");
        }
    }
}
