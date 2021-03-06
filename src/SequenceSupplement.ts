import {ISequenceSupplement} from "./interfaces/ISequenceSupplement";
import {Supplement} from "./enums/Supplement";
import {SequencePart} from "./SequencePart";
import {Wrapping} from "./enums/Wrapping";
import {ISequencePart} from "./interfaces/ISequencePart";

export class SequenceSupplement extends SequencePart implements ISequenceSupplement, ISequencePart {

    public readonly supplement: Supplement;
    public readonly wrapping: Wrapping;
    public readonly values: any[];

    constructor (supplement: Supplement, wrapping: Wrapping, ...values: any[]) {
        super();

        this.supplement = supplement;
        this.wrapping = wrapping;
        this.values = values;
    }

    public stringify (): string {
        const supplement = SequenceSupplement.stringifySupplement(this.supplement);
        const wrapped = SequencePart.stringifyWrapping(this.wrapping, this.values);
        return `${supplement} ${wrapped}`;
    }

    public static stringifySupplement (supplement: Supplement): string {
        switch (supplement) {
            default: return Supplement[supplement].toUpperCase();
        }
    }
}
