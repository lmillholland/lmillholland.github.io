var BLOOB_SIZE = 60;
var NUM_RANDOM_BLOOBS = 750;
var IS_MOUSE_DOWN = false;
var ratio = window.devicePixelRatio || 1;

// ================================================================================================
// -------- Main Thread ---------------------------------------------------------------------------

function Start()
{
	ResizeElements();
	SpawnOrderedBloobs();
	SpawnChaoticBloobs();
	$("#message").show();

	$("body")
		.mousedown(function() { IS_MOUSE_DOWN = true; })
		.mouseup(function() { IS_MOUSE_DOWN = false; });
	
	$(document).on("touchstart", function() {
		IS_MOUSE_DOWN = true;
	});
	$(document).on("touchmove", function() {
		console.log("touchmove");
	});
	$(document).on("touchend", function() {
		IS_MOUSE_DOWN = false;
	});
	$(document).on("touchcancel", function() {
		console.log("touchcancel");
	});
}

// ================================================================================================
// -------- Bloobs --------------------------------------------------------------------------------

function SpawnOrderedBloobs()
{
	var row = -2;
	var col = 0;
	while (row * (BLOOB_SIZE - 6) < screen.height * ratio)
	{
		col = -2;
		while (col * (BLOOB_SIZE - 6) < screen.width * ratio)
		{
			col++;
			new Bloob(row * BLOOB_SIZE, col * BLOOB_SIZE, "7.5vw");
		}
		row++;
	}
}

function SpawnChaoticBloobs()
{
	for (var i = 0; i < NUM_RANDOM_BLOOBS; i++)
	{
		var top  = (Math.random() * (screen.height * ratio + BLOOB_SIZE * 2 * ratio)) - BLOOB_SIZE;
		var left = (Math.random() * (screen.width * ratio + BLOOB_SIZE * 2 * ratio)) - BLOOB_SIZE;
		var font_size = (Math.random() * 8 + 10) + "vw";
		new Bloob(top, left, font_size);
	}
}

class Bloob {
	constructor(top, left, font_size)
	{
		var bloob_html = $("<div class='bloob'></div>");
		bloob_html.css({
			"top": top,
			"left": left,
			"font-size": font_size
		});
		bloob_html.text("🫐");


		$("body").append(bloob_html);

		$(bloob_html).bind("mouseover touchenter touchstart", function()
		{
			console.log("touching");
			if (IS_MOUSE_DOWN || true)
			{
				$(this).remove();
			}
		});

		$(bloob_html).on("touchenter", function()
		{
			console.log("touchenter");
			$(this).remove();
		});
	}
}

// ================================================================================================
// -------- Infrastructure ------------------------------------------------------------------------

function ResizeElements()
{
	/*
	$("#message").css(
	{
		"height": window.innerHeight + "px",
		"width": window.innerWidth + "px",
	});
	$("#header").css({
		"height": window.innerHeight / 2 + "px",
		"line-height": window.innerHeight / 2 + "px",
	});
	*/
}

// ================================================================================================
// -------- Startup -------------------------------------------------------------------------------

$(document).ready(Start);