let LivingCreature = require("./livingCreature");

module.exports = class Grass extends LivingCreature {

    mul() {
        this.multiple++;
        let emptyCells = super.chooseCell(0);
		let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell && this.multiple >= 8) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 1;
            let gr = new Grass(newX, newY);
            grassArr.push(gr);
            this.multiple = 0;
        }
    }
}