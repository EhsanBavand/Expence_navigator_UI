using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExpenseNavigatorAPI.Migrations
{
    /// <inheritdoc />
    public partial class newcolumnforplace : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SubCategoryId",
                table: "Places",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Places_SubCategoryId",
                table: "Places",
                column: "SubCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Places_SubCategories_SubCategoryId",
                table: "Places",
                column: "SubCategoryId",
                principalTable: "SubCategories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Places_SubCategories_SubCategoryId",
                table: "Places");

            migrationBuilder.DropIndex(
                name: "IX_Places_SubCategoryId",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "SubCategoryId",
                table: "Places");
        }
    }
}
