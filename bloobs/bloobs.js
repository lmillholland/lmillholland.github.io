var BLOOB_SIZE = 35;
var NUM_RANDOM_BLOOBS = 4000;
var IS_MOUSE_DOWN = false;

// ================================================================================================
// -------- Main Thread ---------------------------------------------------------------------------

function Start()
{
	ResizeElements();
	//SpawnOrderedBloobs();
	//SpawnChaoticBloobs();
	$("#message").show();

	$("body")
		.mousedown(function() { IS_MOUSE_DOWN = true; })
		.mouseup(function() { IS_MOUSE_DOWN = false; });
}

// ================================================================================================
// -------- Bloobs --------------------------------------------------------------------------------

function SpawnOrderedBloobs()
{
	var row = -2;
	var col = 0;
	while (row * BLOOB_SIZE < screen.height)
	{
		col = -2;
		while (col * BLOOB_SIZE < screen.width)
		{
			col++;
			new Bloob(row * BLOOB_SIZE, col * BLOOB_SIZE);
		}
		row++;
	}
}

function SpawnChaoticBloobs()
{
	for (var i = 0; i < NUM_RANDOM_BLOOBS; i++)
	{
		var top  = (Math.random() * (screen.height + BLOOB_SIZE)) - BLOOB_SIZE;
		var left = (Math.random() * (screen.width + BLOOB_SIZE)) - BLOOB_SIZE;
		new Bloob(top, left);
	}
}

class Bloob {
	constructor(top, left)
	{
		var bloob_html = $("<div class='bloob'></div>");
		bloob_html.css({"top": top, "left": left});
		bloob_html.text("🫐");

		$("body").append(bloob_html);

		$(bloob_html).mouseover(function()
		{
			if (IS_MOUSE_DOWN)
			{
				$(this).remove();
			}
		});
	}
}

// ================================================================================================
// -------- Infrastructure ------------------------------------------------------------------------

function ResizeElements()
{
	$("#message").css(
	{
		"height": window.innerHeight + "px",
		"width": window.innerWidth + "px",
	});
	$("#header").css({
		"height": window.innerHeight / 2 + "px",
		"line-height": window.innerHeight / 2 + "px",
	});
}

// ================================================================================================
// -------- Startup -------------------------------------------------------------------------------

$(document).ready(Start);