import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../assets/black-king.png'
import whiteLogo from '../../assets/white-king.png'
import { Cell } from "../Cell";
import { Colors } from "../Colors";

export class King extends Figure {
    constructor(color:Colors,cell:Cell) {
        super(color,cell);
        this.logo=color===Colors.BLACK?blackLogo:whiteLogo
        this.name=FigureNames.KING
    }
    canMove(target: Cell): boolean {
        if(!super.canMove(target))
            return false
        const absX=Math.abs(this.cell.x-target.x)
        const absY=Math.abs(this.cell.y-target.y)
        return ((absX===1&&absY<=1)||(absX<=1&&absY===1))
    }
}