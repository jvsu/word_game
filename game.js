// create a class called Playground
function Playground(selector,selector_word,selector_score)
{
	this.canvas = document.getElementById(selector);
	this.selector_word = selector_word; // stores the id of the input where the user can type the word
	this.selector_score = selector_score; //stores teh id of the div where the score is stored

	this.words = []; //these are all the word coming down
	this.score = 0; //stores user score
	this.counter = 0; //this is number of words created


	// This is the method that is updated every .5 seconds
	this.playGame = function()
	{
		this.fallWords(); // make the words fall down
		this.createWord(); // create new words to fall down
		this.updateWordPositions(); // updates the position of the words
	} //end of playgame. 

	// this function checks the word the use types in the box 
	
	this.checkWord = function(typed)
	{
		ini_score = this.score;
		for(i in this.words)
		{
			if(this.words[i].word == typed)
			{
				console.log('#word_' + this.words[i].id);
				$('#word_' + this.words[i].id).remove();
				this.score = this.score + 50;
				var snd = new Audio("chaching.mp3"); // buffers automatically when created
				snd.play();
			}
		}

		if(ini_score != this.score) 
		{
			$('#'+this.selector_word).val(''); 
			$('#'+this.selector_score).text(this.score); 
		}
	}

	this.createWord = function()
	{
		this.counter++; //add 1 to the word counter count
		//create a new word between 0 and max_x
		var newWord = new Word(this.counter);
		newWord.createRandomWordsBetween(0,500);
		//store this new word into words array
		this.words.push(newWord);
		//insert this new word into the canvas
		this.canvas.innerHTML = this.canvas.innerHTML + "<div id='word_"+(newWord.id)+"'><div style='position:absolute; left:"+newWord.x+"px; top:"+newWord.y+"px'>"+newWord.word+"</div></div>";
	}
	this.fallWords = function()
	{
		for(var i =this.words.length-1; i>=0;i--)
		{
			this.words[i].y = this.words[i].y +15; //adds 15 to the words y coordinates
			if(this.words[i].y > 385) //if it is greater than 385 then it hit the bottom.
			{
				$('#word_' + this.words[i].id).remove();		//remove the word from html if it hits the bottom 
				if(this.words[i].word != '')					//penalize the user but only if the word is not empty, checks the word box and if it is not empty then -100
					this.score = this.score - 100;
				
				$('#'+this.selector_score).text(this.score);    //Update the Score
				this.words.shift();								//remove the last item in the array
			}
		}
	}
	this.updateWordPositions = function()
	{
		for(i in this.words) // for all the words in the array go through all of it get the individual word and then post it at the coordinate done every .5 second
		{
			loc = document.getElementById('word_'+this.words[i].id);
			if(loc) loc.innerHTML = "<div style='position:absolute; left:"+this.words[i].x+"px; top:"+this.words[i].y+"px'>"+this.words[i].word+"</div>";
		}
	}


function Word(id)
{
	var words = ["cash", "tmt", "boxing","vegas","mgm"];
	this.x = 0;
	this.y = 0;
	this.id = id;

	this.createRandomWordsBetween = function(x_min, x_max)
	{
		random_index = parseInt(Math.random()*words.length); //this is how you pick a random word in an array; Random() gives you a number between 0 and 1 times the length of the array words and parse int gives you jus the integer. 
		this.word = words[random_index]; // example  word[2] puts a an index number at random from the line of code before.
		random_x_index = parseInt(Math.random()*(x_max-x_min-words.length*15)); // this gives a random number to be the x coordinate
		this.x = x_min + random_x_index;	//from 0 x coordinate print the word here. 
	}
}

}//end of playground