using Microsoft.AspNetCore.Mvc;
using RawMaterialTracker.Models;
using RawMaterialTracker.Services;

namespace RawMaterialTracker.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StockItemsController : ControllerBase
{
    private readonly StockItemService _service;

    public StockItemsController(StockItemService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IEnumerable<StockItem>> Get() => await _service.GetAll();

    [HttpGet("{id}")]
    public async Task<ActionResult<StockItem>> Get(int id)
    {
        var item = await _service.Get(id);
        if (item is null) return NotFound();

        return item;
    }

    [HttpPost]
    public async Task<IActionResult> Create(StockItem item)
    {
        await _service.Add(item);
        return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, StockItem item)
    {
        if (id != item.Id) return BadRequest("ID mismatch");

        try
        {
            await _service.Update(item);
        }
        catch(Exception)
        {
            var existingItem = await _service.Get(id);
            if (existingItem is null) return NotFound();

            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.Delete(id);
        return NoContent();
    }
}