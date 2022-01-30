export class Points
{
    currentScore;
    highScore;

    constructor()
    {
        this.currentScore = 0;
        this.highScore = 0; 
    }

    updateScore(newCurrentScore) {
		this.currentScore = newCurrentScore;
        let elem = document.querySelector('.current-score');
        elem.innerHTML = 'Score<br><span>' + this.currentScore + '</span>';

		this.highScore = Math.max(this.currentScore, this.highScore);
		elem = document.querySelector('.high-score');
        elem.innerHTML = 'Best result<br><span>' + this.highScore + '</span>';
	}
}