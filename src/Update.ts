import {SequenceBuilder} from "./SequenceBuilder";
import {Operation} from "./enums/Operation";
import {SequenceOperation} from "./operations/SequenceOperation";
import {ISequenceColumn} from "./interfaces/ISequenceColumn";
import {Location} from "./enums/Location";
import {SequenceLocation} from "./locations/SequenceLocation";
import {Assignment} from "./enums/Assignment";
import {ISequenceAssigment} from "./interfaces/assignments/ISequenceAssignment";
import {SequenceAssignment} from "./assignments/SequenceAssignment";
import {SequenceAssignation} from "./assignments/assignations/SequenceAssignation";
import {IUpdate} from "./interfaces/IUpdate";
import {ISequenceBuilder} from "./interfaces/ISequenceBuilder";
import {Sanitise} from "./utilities/Sanitise";
import {Arrangement} from "./enums/Arrangement";

export class Update extends SequenceBuilder implements IUpdate, ISequenceBuilder {

    public assignment: ISequenceAssigment;

    constructor () {
        super ();

        this.operation = new SequenceOperation(Operation.Update);
        this.assignment = new SequenceAssignment(Assignment.Set);
    }

    public table (tableName: string): this {
        if (!this.location) this.location = new SequenceLocation(Location.None, tableName);
        return this;
    }

    public column (column: ISequenceColumn, value: any): this {
        this.assignment.assignations.push(new SequenceAssignation(column, Sanitise.input(value)));
        return this;
    }

    public orderBy (column: ISequenceColumn, arrangement: Arrangement): this {
        throw new Error(`UPDATE statements cannot have an ORDER BY clause`);
    }

    public groupBy (column: ISequenceColumn, arrangement: Arrangement): this {
        throw new Error(`UPDATE statements cannot have a GROUP BY clause`);
    }

    public limit (amount: number): this {
        throw new Error(`UPDATE statements cannot have a LIMIT clause`);
    }

    public stringify (): string {
        const operation: string = Sanitise.part(this.operation);
        const location: string = Sanitise.part(this.location);
        const assignment: string = Sanitise.part(this.assignment);
        return (`${operation}${location}${assignment}${this.stringifyBase()}`).trim();
    }

}
