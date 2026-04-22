using Microsoft.AspNetCore.Mvc;
using RawMaterialTracker.Models;
using RawMaterialTracker.Services;

namespace RawMaterialTracker.Controllers;

[ApiController] // これをつけると Web API としての便利機能が有効になる
[Route("api/[controller]")]// アクセス先が /api/materials になる
public class MaterialsController : ControllerBase
{
    private readonly MaterialService _service;

    public MaterialsController(MaterialService service)
    {
        _service = service;
    }

    // GET: api/materials
    [HttpGet]
    public async Task<IEnumerable<Material>> GetAll()
    {
        return await _service.GetAll();
    }

    // GET: api/materials/id
    [HttpGet("{id}")]
    public async Task<ActionResult<Material>> GetById(int id)
    {
        var material = await _service.Get(id);

        if (material is null) return NotFound();

        return material;
    }

    [HttpPost]
    public async Task<IActionResult> Create(Material material)
    {
        try
        {
            await _service.Add(material);
            return CreatedAtAction(nameof(GetAll), new { id = material.Id}, material);
        }
        catch (InvalidOperationException ex)
        {
            return StatusCode(400, ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Material material)
    {
        if (id != material.Id) return BadRequest("ID mismatch");

        try
        {
            await _service.Update(material);
        }
        catch(Exception)
        {
            var existingMaterial = await _service.Get(id);
            if (existingMaterial is null) return NotFound();

            throw;
        }
        
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _service.Delete(id);
            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            // ここで例外メッセージを「400 Bad Request」のボディに入れて返す
            return StatusCode(400, ex.Message);
        }
    }
    
}