import { Address } from "./Address";
import { ApplicationWorkFlow } from "./ApplicationWorkFlow";
import { Contact } from "./Contact";
import { Employee } from "./Employee";
import { Person } from "./Person";
import { VisaStatus } from "./VisaStatus";

export interface EmployeeInfo {
    employee: Employee;
	applicationWorkFlow: ApplicationWorkFlow;
	person: Person;
	address: Address;
	contacts: Contact[];
	visaStatus: VisaStatus;
}