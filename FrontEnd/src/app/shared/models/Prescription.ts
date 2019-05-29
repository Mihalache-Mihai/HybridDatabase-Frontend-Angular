export class Prescription{
    prescriptionSeries?: string;
    locality?: string;
    county?: string;
    cnp?: string;
    name?: string;
    residence?: string;
    diagnosis?: string;
    medicines?: Map<string,string>;
}