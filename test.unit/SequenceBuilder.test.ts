// Testing imports
import {expect} from "chai";
// Dependencies
import {SequenceColumn} from "../src/SequenceColumn";
import {Predicate} from "../src/enums/Predicate";
import {LogicalOperator} from "../src/enums/LogicalOperator";
import {SequenceCondition} from "../src/conditions/SequenceCondition";
import {Condition} from "../src/enums/Condition";
import {LogicalConditional} from "../src/conditions/conditionals/LogicalConditional";
import {CriteriaConditional} from "../src/conditions/conditionals/CriteriaConditional";
import {Conditional} from "../src/enums/Conditional";
import {Arrangement} from "../src/enums/Arrangement";
import {SequenceFormation} from "../src/formations/SequenceFormation";
import {Formation} from "../src/enums/Formation";
import {CoalescingOperator} from "../src/enums/CoalescingOperator";
import {LimitFormation} from "../src/formations/LimitFormation";
// Tested import.
import {SequenceBuilder} from "../src/SequenceBuilder";

// Testing instance
class TestBuilder extends SequenceBuilder {}
let builder: SequenceBuilder;

// Test data
let columnA: SequenceColumn;
let columnB: SequenceColumn;
let numberComparisonValue: number;
let stringComparisonValue: string;
let stringComparisonValues: string[];

beforeEach(() => {
    builder = new TestBuilder();
    columnA = new SequenceColumn(Predicate.None, "columnA");
    columnB = new SequenceColumn(Predicate.None, "columnB");
    numberComparisonValue = 1;
    stringComparisonValue = "A";
    stringComparisonValues = ["A", "B", "C"];
});

describe("SequenceBuilder", () => {
   describe("Instance Methods", () => {
     describe("where", () => {
         it("Sets the .condition to a {SequenceCondition} with a {Condition} of Where", () => {
             expect(builder.condition).to.be.undefined;
             builder.where(columnA, LogicalOperator.Equality, numberComparisonValue);
             expect(builder.condition).instanceOf(SequenceCondition);
             expect(builder.condition.condition).to.equal(Condition.Where);
         });
         it("Adds a {ISequenceColumn} in an {LogicalConditional} to the {SequenceCondition}'s .conditionals", () => {
             expect(builder.condition).to.be.undefined;
             builder.where(columnA, LogicalOperator.Equality, stringComparisonValue);
             expect(builder.condition.conditionals).to.have.length(1);
             expect(builder.condition.conditionals[0]).instanceOf(LogicalConditional);
             builder.where(columnB, LogicalOperator.Equality, numberComparisonValue);
             expect(builder.condition.conditionals).to.have.length(2);
             expect(builder.condition.conditionals[1]).instanceOf(LogicalConditional);
         });
         it("Corrects {string} values passed in", () => {
             expect(builder.condition).to.be.undefined;
             builder.where(columnA, LogicalOperator.Equality, stringComparisonValue);
             const casted: LogicalConditional = builder.condition.conditionals[0] as LogicalConditional;
             expect(casted.value).to.equal("'A'");
         });
     });
     describe("whereIn", () => {
         it("Sets the .condition to a {SequenceCondition} with a {Condition} of Where", () => {
             expect(builder.condition).to.be.undefined;
             builder.whereIn(columnA);
             expect(builder.condition).instanceOf(SequenceCondition);
             expect(builder.condition.condition).to.equal(Condition.Where);
         });
         it("Adds a {SequenceColumn} in a {CriteriaConditional} to the {SequenceCondition}'s .conditionals", () => {
             expect(builder.condition).to.be.undefined;
             builder.whereIn(columnA);
             expect(builder.condition.conditionals).to.have.length(1);
             expect(builder.condition.conditionals[0]).instanceOf(CriteriaConditional);
             expect(builder.condition.conditionals[0].conditional).to.equal(Conditional.In);
             builder.whereIn(columnB);
             expect(builder.condition.conditionals).to.have.length(2);
             expect(builder.condition.conditionals[1]).instanceOf(CriteriaConditional);
             expect(builder.condition.conditionals[1].conditional).to.equal(Conditional.In);
         });
     });
     describe("whereNotIn", () => {
         it("Sets the .condition to a {SequenceCondition} with a {Condition} of Where", () => {
             expect(builder.condition).to.be.undefined;
             builder.whereNotIn(columnA);
             expect(builder.condition).instanceOf(SequenceCondition);
             expect(builder.condition.condition).to.equal(Condition.Where);
         });
         it("Adds a {SequenceColumn} in a {CriteriaConditional} to the {SequenceCondition}'s .conditionals", () => {
            expect(builder.condition).to.be.undefined;
            builder.whereNotIn(columnA);
            expect(builder.condition.conditionals).to.have.length(1);
            expect(builder.condition.conditionals[0]).instanceOf(CriteriaConditional);
            expect(builder.condition.conditionals[0].conditional).to.equal(Conditional.NotIn);
            builder.whereNotIn(columnB);
            expect(builder.condition.conditionals).to.have.length(2);
            expect(builder.condition.conditionals[1]).instanceOf(CriteriaConditional);
            expect(builder.condition.conditionals[1].conditional).to.equal(Conditional.NotIn);
        });
     });
     describe("orderBy", () => {
         it("Sets the .ordering to a {SequenceFormation} with a {Formation} of OrderBy", () => {
            expect(builder.ordering).to.be.undefined;
            builder.orderBy(columnA, Arrangement.Ascending);
            expect(builder.ordering).instanceOf(SequenceFormation);
            expect(builder.ordering.formation).to.equal(Formation.OrderBy);
         });
         it("Adds a {SequenceFilter} to {SequenceFormation}'s .filters", () => {
             expect(builder.ordering).to.be.undefined;
             builder.ordering = new SequenceFormation(Formation.OrderBy, CoalescingOperator.And);
             expect(builder.ordering.filters).to.be.empty;
             builder.orderBy(columnA, Arrangement.Ascending);
             expect(builder.ordering.filters).to.have.length(1);
             expect(builder.ordering.filters[0].arrangement).to.equal(Arrangement.Ascending);
             builder.orderBy(columnB, Arrangement.Ascending);
             expect(builder.ordering.filters).to.have.length(2);
             expect(builder.ordering.filters[0].arrangement).to.equal(Arrangement.Ascending);
         });
     });
     describe("groupBy", () => {
         it("Sets the .ordering to a {SequenceFormation} with a {Formation} of GroupBy", () => {
             expect(builder.ordering).to.be.undefined;
             builder.groupBy(columnA, Arrangement.Ascending);
             expect(builder.grouping).instanceOf(SequenceFormation);
             expect(builder.grouping.formation).to.equal(Formation.GroupBy);
         });
         it("Adds a {SequenceFilter} to the {SequenceFormation}'s .filters", () => {
             expect(builder.grouping).to.be.undefined;
             builder.grouping = new SequenceFormation(Formation.GroupBy, CoalescingOperator.And);
             expect(builder.grouping.filters).to.be.empty;
             builder.groupBy(columnA, Arrangement.Ascending);
             expect(builder.grouping.filters).to.have.length(1);
             expect(builder.grouping.filters[0].arrangement).to.equal(Arrangement.Ascending);
             builder.groupBy(columnB, Arrangement.Ascending);
             expect(builder.grouping.filters).to.have.length(2);
             expect(builder.grouping.filters[1].arrangement).to.equal(Arrangement.Ascending);
         });
     });
     describe("limit", () => {
         it("Sets the .limitation to a {LimitFormation}", () => {
             expect(builder.limitation).to.be.undefined;
             builder.limit(numberComparisonValue);
             expect(builder.limitation).instanceOf(LimitFormation);
             expect(builder.limitation.amount).to.equal(numberComparisonValue);
         });
     });
   });
});
