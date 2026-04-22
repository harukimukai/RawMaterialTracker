using Microsoft.AspNetCore.Mvc;
using RawMaterialTracker.Models;
using RawMaterialTracker.Services;

namespace RawMaterialTracker.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobController : ControllerBase
{
    private readonly JobService _service;

    public JobController(JobService service)
    {
        _service = service;
    }


    [HttpGet]
    public async Task<IEnumerable<Job>> GetActiveJobs()
    {
        return await _service.GetActiveJobs();
    }

    [HttpPost]
    public async Task<IActionResult> Create(Job job)
    {
        try
        {
            await _service.Add(job);
            return CreatedAtAction(nameof(GetActiveJobs), new { id = job.Id }, job);
        }
        catch (InvalidOperationException ex)
        {
            return StatusCode(400, ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Job job)
    {
        if (id != job.Id) return BadRequest();

        await _service.Update(job);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.Delete(id);
        return NoContent();
    }
}