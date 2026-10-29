// HealthCover Uganda — full dataset
// Migrated from assets/js/data.js — all data preserved exactly.

export type BenefitStatus = 'covered' | 'not-covered' | 'check-first';
export type PlanCategory = 'individual' | 'family' | 'self-employed' | 'group' | 'senior';

export interface Benefit {
  group: string;
  name: string;
  status: BenefitStatus;
  detail: string;
  limit: string | null;
}

export interface Exclusion {
  name: string;
  detail: string;
}

export interface LimitRow {
  label: string;
  value: string;
  period: string;
}

export interface CheckFirstItem {
  name: string;
  detail: string;
}

export interface WaitingPeriod {
  label: string;
  value: string;
  note: string;
}

export interface EnrolStep {
  title: string;
  detail: string;
}

export interface Premium {
  amount: number;
  currency: string;
  frequency: 'month' | 'year' | 'week';
  note: string;
}

export interface Plan {
  id: string;
  insurerId: string;
  insurer: string;
  planName: string;
  description: string;
  category: PlanCategory;
  premium: Premium | null;
  benefits: Benefit[];
  exclusions: Exclusion[];
  limits: LimitRow[];
  checkFirst: CheckFirstItem[];
  waiting: WaitingPeriod[];
  eligibility: string[];
  documents: string[];
  enrolment: EnrolStep[];
  source: string | null;
  lastVerified: string | null;
  demo: boolean;
}

export interface Insurer {
  id: string;
  name: string;
  initials: string;
  description: string;
  website: string | null;
  phone: string | null;
  email: string | null;
  intermediary: string | null;
  lastVerified: string | null;
  demo: boolean;
}

export interface GlossaryEntry {
  id: string;
  term: string;
  definition: string;
  example: string;
}

export interface FaqEntry {
  q: string;
  a: string;
}

// ─── Lookups ─────────────────────────────────────────────────────────────────

export const CATEGORIES: { id: PlanCategory; labelKey: string }[] = [
  { id: 'individual', labelKey: 'catIndividual' },
  { id: 'family', labelKey: 'catFamily' },
  { id: 'self-employed', labelKey: 'catSelfEmployed' },
  { id: 'group', labelKey: 'catGroup' },
  { id: 'senior', labelKey: 'catSenior' },
];

export const BENEFIT_GROUPS = [
  { id: 'hospitalisation', label: 'Hospitalisation' },
  { id: 'outpatient', label: 'Outpatient' },
  { id: 'maternity', label: 'Maternity' },
  { id: 'dental', label: 'Dental' },
  { id: 'optical', label: 'Optical' },
  { id: 'other', label: 'Other benefits' },
];

export const INSURERS: Insurer[] = [
  {
    id: 'nilecare', name: 'NileCare Health', initials: 'NC',
    description: 'A fictional individual and family insurer used here to demonstrate a straightforward hospital-first product with a clear exclusion list.',
    website: 'https://example.com/insurers/nilecare', phone: null, email: null,
    intermediary: 'Demonstration record: enrolment is described through a licensed agent.',
    lastVerified: null, demo: true,
  },
  {
    id: 'riftvalley', name: 'Rift Valley Assurance', initials: 'RV',
    description: 'A fictional family-cover insurer. Included to show how maternity limits and longer waiting periods should be presented.',
    website: 'https://example.com/insurers/rift-valley', phone: null, email: null,
    intermediary: 'Demonstration record: no intermediary is appointed.',
    lastVerified: null, demo: true,
  },
  {
    id: 'savannah', name: 'Savannah Mutual', initials: 'SM',
    description: 'A fictional micro-insurer built around small weekly payments for market traders, boda riders and other self-employed workers.',
    website: 'https://example.com/insurers/savannah-mutual', phone: null, email: null,
    intermediary: 'Demonstration record: enrolment through a community savings group is described.',
    lastVerified: null, demo: true,
  },
  {
    id: 'jamii', name: 'Jamii Community Health', initials: 'JC',
    description: 'A fictional group scheme for employers, SACCOs and associations. Its premium is deliberately not supplied, to demonstrate honest missing data.',
    website: 'https://example.com/insurers/jamii', phone: null, email: null,
    intermediary: 'Demonstration record: groups enrol through the scheme administrator.',
    lastVerified: null, demo: true,
  },
  {
    id: 'lakeside', name: 'Lakeside Health Partners', initials: 'LH',
    description: 'A fictional senior-focused insurer, included to show how age limits and pre-existing conditions should be flagged for confirmation.',
    website: 'https://example.com/insurers/lakeside', phone: null, email: null,
    intermediary: 'Demonstration record: family members may enquire on behalf of a senior.',
    lastVerified: null, demo: true,
  },
];

const B = (group: string, name: string, status: BenefitStatus, detail: string, limit?: string): Benefit =>
  ({ group, name, status, detail, limit: limit ?? null });

export const PLANS: Plan[] = [
  {
    id: 'nilecare-essential', insurerId: 'nilecare', insurer: 'NileCare Health',
    planName: 'NileCare Essential', category: 'individual',
    description: 'A hospital-first plan for one adult. It pays for admission, surgery and emergencies, with a modest outpatient allowance and no maternity cover.',
    premium: { amount: 38000, currency: 'UGX', frequency: 'month', note: 'Illustrative monthly premium for one adult aged 18–45.' },
    benefits: [
      B('hospitalisation','Inpatient admission','covered','Ward, nursing, theatre and doctor fees during an admission.','UGX 8,000,000 per year'),
      B('hospitalisation','Surgery and theatre','covered','Listed surgical procedures, including surgeon and anaesthetist fees.'),
      B('hospitalisation','Emergency and ambulance','covered','Emergency treatment and ambulance transfer within 30km of Kampala.','UGX 250,000 per trip'),
      B('outpatient','GP and specialist consultations','covered','Up to six visits a year at network clinics.','UGX 40,000 per visit'),
      B('outpatient','Laboratory tests and scans','covered','Tests ordered by a treating doctor at a network facility.','UGX 500,000 per year'),
      B('outpatient','Prescribed medicines','covered','Drugs on the scheme formulary only.','UGX 300,000 per year'),
      B('maternity','Maternity and delivery','not-covered','No maternity benefit on this plan at any stage.'),
      B('dental','Routine dental care','check-first','The benefit schedule mentions "basic dental" without stating a limit or which treatments qualify.'),
      B('optical','Optical care','not-covered','Glasses, lenses and eye tests are not covered.'),
      B('other','Telephone medical advice','covered','Nurse-led phone line during working hours.'),
    ],
    exclusions: [
      { name: 'Pre-existing conditions', detail: 'Any condition diagnosed or treated in the 12 months before joining is excluded for the first year.' },
      { name: 'Cosmetic and elective procedures', detail: 'Treatment whose main purpose is cosmetic, including elective circumcision for adults.' },
      { name: 'HIV and antiretroviral therapy', detail: 'Not covered on this plan; treatment is available through public facilities.' },
      { name: 'Self-inflicted injury', detail: 'Injury caused deliberately, or while under the influence of alcohol or drugs.' },
      { name: 'Treatment abroad', detail: 'No overseas referral or reimbursement.' },
      { name: 'Non-network facilities', detail: 'Except in an emergency, where notification must be given within 24 hours.' },
    ],
    limits: [
      { label: 'Overall annual limit', value: 'UGX 8,000,000', period: 'Per member, per policy year' },
      { label: 'Inpatient per admission', value: 'UGX 3,000,000', period: 'Per admission, up to 3 a year' },
      { label: 'Outpatient total', value: 'UGX 850,000', period: 'Per member, per policy year' },
      { label: 'GP consultation', value: 'UGX 40,000', period: 'Per visit, maximum 6 a year' },
      { label: 'Ambulance', value: 'UGX 250,000', period: 'Per trip, maximum 2 a year' },
    ],
    checkFirst: [
      { name: 'Dental benefit limit', detail: 'The benefit schedule refers to "basic dental" but gives no cap or definition. Ask which treatments are included and to what amount.' },
      { name: 'Network hospitals near you', detail: 'No provider list is supplied with this record. Confirm which facilities are in the network.' },
      { name: 'Premium after age 45', detail: 'The quoted premium covers ages 18–45. Ask for the rate that applies to you.' },
    ],
    waiting: [
      { label: 'General illnesses', value: '30 days', note: 'Accidents are covered from day one.' },
      { label: 'Pre-existing conditions', value: '12 months', note: 'Then reviewed individually, not automatically covered.' },
      { label: 'Surgery', value: '90 days', note: 'Except emergency surgery following an accident.' },
    ],
    eligibility: ['One adult aged 18–65.','No dependants can be added to this plan.','Resident in Uganda.','No medical examination stated in this record — confirm with the insurer.'],
    documents: ['National identity document.','Completed application form.','Passport photograph.','First premium payment confirmation.'],
    enrolment: [
      { title: 'Read the exclusion list first', detail: 'Six exclusions are listed, including a 12-month pre-existing condition wait. If any of them matter to you, this plan is probably not the right fit.' },
      { title: 'Confirm the dental benefit and the network', detail: 'Both are flagged as "check first" in this record. Get the answer in writing before paying.' },
      { title: 'Ask for a written quote', detail: 'The premium shown is illustrative. Ask for the rate that applies to your age.' },
      { title: 'Submit the application with documents', detail: 'National ID, photo and completed form. Keep a copy of everything you hand over.' },
      { title: 'Pay the first premium directly to the insurer', detail: 'Never pay into a personal mobile money number. Keep the receipt.' },
      { title: 'Collect the member card and note your start date', detail: 'Waiting periods run from the commencement date on the policy schedule, not from the day you paid.' },
    ],
    source: null, lastVerified: null, demo: true,
  },
  {
    id: 'riftvalley-family', insurerId: 'riftvalley', insurer: 'Rift Valley Assurance',
    planName: 'Rift Family Plus', category: 'family',
    description: 'Family cover for two adults and up to four children, including maternity after a waiting period, dental on referral and a larger inpatient limit.',
    premium: { amount: 95000, currency: 'UGX', frequency: 'month', note: 'Illustrative monthly premium for two adults and up to four children.' },
    benefits: [
      B('hospitalisation','Inpatient admission','covered','Private ward, nursing, theatre and doctor fees.','UGX 15,000,000 per family per year'),
      B('hospitalisation','Surgery and theatre','covered','Including specialist surgeon and anaesthetist fees.'),
      B('hospitalisation','Emergency and ambulance','covered','Nationwide emergency transfer to a network facility.','UGX 400,000 per trip'),
      B('outpatient','GP and specialist consultations','covered','Unlimited GP visits; specialist visits on referral.','UGX 60,000 per visit'),
      B('outpatient','Laboratory tests and scans','covered','Including ultrasound and basic X-ray.','UGX 900,000 per family per year'),
      B('maternity','Normal and caesarean delivery','covered','After a 9-month waiting period, at a network hospital.','UGX 1,500,000 per birth'),
      B('maternity','Antenatal and postnatal care','covered','Eight antenatal visits and two postnatal reviews.','UGX 300,000 per pregnancy'),
      B('dental','Dental care on referral','check-first','Described as "dental on referral" with no stated limit; unclear whether fillings and extractions are included.'),
      B('optical','Optical care','not-covered','Eye tests and spectacles are excluded.'),
      B('other','Last expense benefit','covered','A lump sum on the death of a covered member.','UGX 1,000,000'),
    ],
    exclusions: [
      { name: 'Pre-existing conditions', detail: 'Excluded for 18 months, then considered case by case.' },
      { name: 'Optical care', detail: 'Eye tests, lenses and frames are not covered.' },
      { name: 'Infertility treatment', detail: 'Including IVF and hormone therapy.' },
      { name: 'Cosmetic surgery', detail: 'Unless required to repair injury from a covered accident.' },
      { name: 'Home births', detail: 'Deliveries outside a network facility are not reimbursed.' },
      { name: 'Alcohol and drug-related treatment', detail: 'Including rehabilitation admissions.' },
    ],
    limits: [
      { label: 'Family annual limit', value: 'UGX 15,000,000', period: 'Shared across all members, per policy year' },
      { label: 'Maternity per birth', value: 'UGX 1,500,000', period: 'Per pregnancy, after 9 months' },
      { label: 'Outpatient total', value: 'UGX 2,000,000', period: 'Per family, per policy year' },
      { label: 'Specialist consultation', value: 'UGX 100,000', period: 'Per visit, maximum 8 a year' },
      { label: 'Last expense', value: 'UGX 1,000,000', period: 'Per member, once' },
    ],
    checkFirst: [
      { name: 'Dental limit and scope', detail: 'The record says "dental on referral" without a figure. Ask what is included, the cap, and whether orthodontics is excluded.' },
      { name: 'Whether the family limit is shared', detail: 'The annual limit appears to be shared across all members. Confirm this in writing — it changes what is left for each person.' },
      { name: 'Premium for children under 1', detail: 'The quoted premium does not state how newborns are rated.' },
    ],
    waiting: [
      { label: 'General illnesses', value: '30 days', note: 'Accidents covered from day one.' },
      { label: 'Maternity', value: '9 months', note: 'Applies to each pregnancy, including the first.' },
      { label: 'Pre-existing conditions', value: '18 months', note: 'Then reviewed individually.' },
      { label: 'Dental and optical', value: '6 months', note: 'Optical is excluded entirely despite the waiting period being listed.' },
    ],
    eligibility: ['Two adults aged 18–65.','Up to four children aged 0–18, or up to 25 if in full-time education.','Marriage certificate required for a spouse who keeps a different surname.','One application covers the whole family.'],
    documents: ['National identity document for each adult.','Birth certificate for each child.','Marriage certificate, where the surname differs.','Completed family application form.','Passport photographs for each member.'],
    enrolment: [
      { title: 'Check the shared family limit suits you', detail: 'UGX 15,000,000 is for the whole family, not each person. If one member has a major admission, the rest share what remains.' },
      { title: 'Plan around the maternity wait', detail: 'Maternity is only covered after 9 months. If you are planning a pregnancy now, this plan will not help with that birth.' },
      { title: 'Ask about the dental cap', detail: 'This record cannot confirm it. Get the answer in writing before you enrol.' },
      { title: 'Gather documents for every member', detail: 'IDs, birth certificates, marriage certificate where needed, and photographs.' },
      { title: 'Submit the application and pay the first premium', detail: 'Pay the insurer directly and keep the receipt.' },
      { title: 'Register each member and collect cards', detail: 'Check that every child is listed correctly before you need to use the cover.' },
    ],
    source: null, lastVerified: null, demo: true,
  },
  {
    id: 'savannah-micro', insurerId: 'savannah', insurer: 'Savannah Mutual',
    planName: 'Savannah Micro Health', category: 'self-employed',
    description: 'A low-cost plan for self-employed workers, paid weekly by mobile money. It focuses on common illnesses and small admissions, with a low annual ceiling.',
    premium: { amount: 12000, currency: 'UGX', frequency: 'month', note: 'Also payable as UGX 3,000 per week by mobile money.' },
    benefits: [
      B('hospitalisation','Inpatient admission','covered','General ward only, at participating clinics and small hospitals.','UGX 500,000 per admission'),
      B('hospitalisation','Emergency treatment','covered','Accidents and sudden illness, including transport to a facility.','UGX 150,000 per event'),
      B('outpatient','GP consultations','covered','At participating clinics, with a small co-payment per visit.','UGX 25,000 per visit, 8 a year'),
      B('outpatient','Malaria and typhoid treatment','covered','Including a rapid test and first-line drugs.'),
      B('outpatient','Prescribed medicines','covered','Essential medicines list only.','UGX 120,000 per year'),
      B('maternity','Maternity and delivery','not-covered','No maternity benefit. Members are referred to public facilities.'),
      B('dental','Dental care','check-first','Not mentioned anywhere in the product summary. Absence is not proof of exclusion — ask the insurer.'),
      B('optical','Optical care','check-first','Not mentioned anywhere in the product summary. Ask before assuming either way.'),
      B('other','Chronic condition review','not-covered','Ongoing review and medication for chronic conditions are excluded in year one.'),
    ],
    exclusions: [
      { name: 'Maternity', detail: 'No delivery, antenatal or postnatal cover.' },
      { name: 'Chronic conditions in year one', detail: 'Diabetes, hypertension, asthma and similar conditions are excluded for the first 12 months.' },
      { name: 'HIV and antiretroviral therapy', detail: 'Not covered; public facilities provide treatment.' },
      { name: 'Specialist and referral treatment', detail: 'Referrals to specialists or national referral hospitals are not covered.' },
      { name: 'Surgery', detail: 'Except minor procedures carried out at a participating clinic.' },
      { name: 'Treatment outside the participating network', detail: 'Except emergencies, which must be reported within 24 hours.' },
    ],
    limits: [
      { label: 'Annual limit', value: 'UGX 1,500,000', period: 'Per member, per policy year' },
      { label: 'Per admission', value: 'UGX 500,000', period: 'Maximum 2 admissions a year' },
      { label: 'Outpatient per visit', value: 'UGX 25,000', period: 'Member pays UGX 5,000 co-payment' },
      { label: 'Medicines', value: 'UGX 120,000', period: 'Per year' },
      { label: 'Emergency transport', value: 'UGX 150,000', period: 'Per event' },
    ],
    checkFirst: [
      { name: 'Dental and optical', detail: 'Neither is mentioned in the summary. That does not mean they are excluded — ask directly.' },
      { name: 'Co-payment at each visit', detail: 'A UGX 5,000 co-payment applies per outpatient visit. Confirm whether it applies to admissions too.' },
      { name: 'Which clinics are participating', detail: 'The value of this plan depends entirely on whether a participating clinic is near you.' },
      { name: 'Late payment rules', detail: 'Weekly payments can lapse. Ask how many missed weeks before cover stops.' },
    ],
    waiting: [
      { label: 'Accidents', value: 'Day 1', note: 'Covered from the first day of payment.' },
      { label: 'General illness', value: '30 days', note: '' },
      { label: 'Chronic conditions', value: '12 months', note: 'Then only if the policy is renewed without a break.' },
    ],
    eligibility: ['Aged 18–65.','Any self-employed or informally employed worker.','Spouse and up to four children can be added for an extra weekly amount.','No medical examination required in this demonstration record.'],
    documents: ['National identity document.','Mobile money number registered in your own name.','Passport photograph.','Group membership letter, if enrolling through a savings group.'],
    enrolment: [
      { title: 'Find out which clinic is participating near you', detail: 'This is the single most important question for this plan. If the nearest participating clinic is far away, the cover is worth much less to you.' },
      { title: 'Understand the annual ceiling', detail: 'UGX 1,500,000 a year is roughly one short admission. It is protection against a small bill, not a major illness.' },
      { title: 'Register with your ID and mobile money number', detail: 'Registration is usually done in person at a clinic or through a savings group.' },
      { title: 'Pay the first week or month', detail: 'Keep every mobile money confirmation message.' },
      { title: 'Collect your card and check the member list', detail: 'Confirm your dependants are listed and that the 30-day waiting period start date is correct.' },
    ],
    source: null, lastVerified: null, demo: true,
  },
  {
    id: 'jamii-group', insurerId: 'jamii', insurer: 'Jamii Community Health',
    planName: 'Jamii Group Cover', category: 'group',
    description: 'A group scheme for employers, SACCOs and associations with ten or more members. The premium is quoted per group, so no price is published here.',
    premium: null,
    benefits: [
      B('hospitalisation','Inpatient admission','covered','General and private ward, depending on the group tier chosen.','UGX 6,000,000 per member per year'),
      B('hospitalisation','Surgery and theatre','covered','Including specialist fees at network hospitals.'),
      B('outpatient','GP and specialist consultations','covered','At network clinics, with a per-visit cap.','UGX 50,000 per visit'),
      B('outpatient','Laboratory tests and scans','covered','Basic investigations at network facilities.','UGX 600,000 per member per year'),
      B('maternity','Maternity and delivery','covered','After a 12-month waiting period on first enrolment.','UGX 1,200,000 per birth'),
      B('dental','Dental care','covered','Basic dental treatment at designated providers.','UGX 200,000 per member per year'),
      B('optical','Optical care','check-first','Listed as available "on selected tiers" without saying which tiers or what the limit is.'),
      B('other','Group life and last expense','covered',"A lump sum payable to the member's nominated beneficiary.",'UGX 2,000,000'),
    ],
    exclusions: [
      { name: 'Pre-existing conditions', detail: "Excluded for 12 months from the group's commencement date." },
      { name: 'Cosmetic treatment', detail: 'Not covered unless repairing injury from a covered accident.' },
      { name: 'Treatment abroad', detail: 'Not covered under this scheme.' },
      { name: 'Self-inflicted injury', detail: 'Including injury sustained while under the influence.' },
      { name: 'War and civil unrest', detail: 'Injury arising from declared conflict is excluded.' },
    ],
    limits: [
      { label: 'Per member annual limit', value: 'UGX 6,000,000', period: 'Per member, per policy year' },
      { label: 'Outpatient total', value: 'UGX 800,000', period: 'Per member, per year' },
      { label: 'Maternity', value: 'UGX 1,200,000', period: 'Per birth, after 12 months' },
      { label: 'Dental', value: 'UGX 200,000', period: 'Per member, per year' },
      { label: 'Group life', value: 'UGX 2,000,000', period: 'Per member, once' },
    ],
    checkFirst: [
      { name: 'Premium for your group', detail: 'No premium is published. It depends on group size, average age and the tier you choose.' },
      { name: 'Which tier includes optical', detail: 'The summary says optical is available on selected tiers without naming them.' },
      { name: 'Whether dependants are included', detail: 'This record does not say whether spouses and children can be added, or at what cost.' },
      { name: 'Minimum group size and evidence required', detail: 'Ten members are stated, but the documents needed to prove the group exists are not listed.' },
    ],
    waiting: [
      { label: 'General illnesses', value: '30 days', note: 'From the group commencement date, not the individual joining date.' },
      { label: 'Maternity', value: '12 months', note: 'Applies on first enrolment of the group.' },
      { label: 'Pre-existing conditions', value: '12 months', note: '' },
    ],
    eligibility: ['A group of ten or more members.','Employers, SACCOs, cooperatives and registered associations.','Members aged 18–65; children 0–18.','The group, not the individual, submits the application.'],
    documents: ['Group registration certificate or employer letter.','Member list with dates of birth.','National identity document for each member.','Birth certificate for each dependant.','Signed group application form.'],
    enrolment: [
      { title: 'Confirm the group is eligible', detail: 'Ten members minimum, and the group must be able to show it exists — registration certificate or employer letter.' },
      { title: 'Ask for a written quotation and tier comparison', detail: 'The premium depends on your group. Ask for each tier in writing, including what changes between them.' },
      { title: 'Check optical and dependant rules', detail: 'Both are unclear in the summary. Have the answers before members are asked to join.' },
      { title: 'Collect a member list and documents', detail: 'Every member needs an ID; every dependant needs a birth certificate.' },
      { title: 'Submit the group application', detail: 'The scheme administrator handles the application — individuals cannot join directly.' },
      { title: 'Distribute cards and brief members', detail: 'Members should know the network, the waiting periods and the pre-authorisation number.' },
    ],
    source: null, lastVerified: null, demo: true,
  },
  {
    id: 'lakeside-senior', insurerId: 'lakeside', insurer: 'Lakeside Health Partners',
    planName: 'Lakeside Senior Care', category: 'senior',
    description: 'Cover for people aged 60 and over, with a strong inpatient limit and chronic condition review. Pre-existing conditions require individual assessment.',
    premium: { amount: 120000, currency: 'UGX', frequency: 'month', note: 'Illustrative monthly premium for one member aged 60–70.' },
    benefits: [
      B('hospitalisation','Inpatient admission','covered','Private ward, nursing and specialist care.','UGX 10,000,000 per year'),
      B('hospitalisation','Surgery and theatre','covered','Including joint replacement at a network hospital, subject to pre-authorisation.'),
      B('hospitalisation','Emergency and ambulance','covered','Nationwide emergency transfer.','UGX 350,000 per trip'),
      B('outpatient','GP and specialist consultations','covered','Including geriatric specialist review.','UGX 70,000 per visit'),
      B('outpatient','Chronic condition review','covered','Routine review and medicines for conditions accepted at enrolment.','UGX 1,200,000 per year'),
      B('outpatient','Laboratory tests and scans','covered','Including annual health screening.','UGX 800,000 per year'),
      B('dental','Dental care','covered','Extractions, fillings and dentures.','UGX 300,000 per year'),
      B('optical','Optical care','covered','One eye test and one pair of lenses a year; frames excluded.','UGX 250,000 per year'),
      B('maternity','Maternity','not-covered','Not applicable at this age band.'),
    ],
    exclusions: [
      { name: 'Frames and cosmetic lenses', detail: 'Optical covers lenses and tests, not frames.' },
      { name: 'Home nursing and care assistants', detail: 'Long-term home care is not covered.' },
      { name: 'Experimental treatment', detail: 'Treatment not recognised by the Uganda Medical and Dental Practitioners Council.' },
      { name: 'Conditions not declared at enrolment', detail: 'Undisclosed conditions are excluded and may void the policy.' },
      { name: 'Treatment abroad', detail: 'Not covered under this plan.' },
    ],
    limits: [
      { label: 'Annual limit', value: 'UGX 10,000,000', period: 'Per member, per policy year' },
      { label: 'Chronic condition review', value: 'UGX 1,200,000', period: 'Per year, for accepted conditions' },
      { label: 'Dental', value: 'UGX 300,000', period: 'Per year' },
      { label: 'Optical', value: 'UGX 250,000', period: 'Per year, lenses only' },
      { label: 'Joint replacement', value: 'UGX 4,000,000', period: 'Once every 5 years, pre-authorised' },
    ],
    checkFirst: [
      { name: 'Whether your existing conditions are accepted', detail: 'Pre-existing conditions are assessed individually. Nothing in this record says yours will be covered.' },
      { name: 'Premium above age 70', detail: 'The quote covers 60–70. Rates above 70 are not supplied.' },
      { name: 'Pre-authorisation turnaround', detail: 'Joint replacement needs approval; the record does not state how long that takes.' },
    ],
    waiting: [
      { label: 'General illnesses', value: '30 days', note: '' },
      { label: 'Pre-existing conditions', value: 'Assessed individually', note: 'May be excluded permanently or loaded on the premium.' },
      { label: 'Joint replacement', value: '12 months', note: 'And pre-authorisation is required.' },
    ],
    eligibility: ['Aged 60 and over at entry.','A completed medical declaration is required.','Applicants aged 70+ are referred for individual assessment.','A family member may enquire on the member\'s behalf.'],
    documents: ['National identity document.','Completed medical declaration form.','List of current medications and treating doctors.','Recent medical report, if requested.','Completed application form signed by the member.'],
    enrolment: [
      { title: 'Declare every existing condition', detail: 'Undisclosed conditions can void the policy. Declare everything, even if you think it is minor.' },
      { title: 'Ask in writing whether your conditions are accepted', detail: 'Pre-existing conditions are assessed individually here. Do not assume acceptance.' },
      { title: 'Get the premium for your age band', detail: 'The quote covers 60–70. Ask for the rate that will apply as you get older.' },
      { title: 'Complete the medical declaration with your doctor', detail: 'Take the form to your treating doctor so the medication list is accurate.' },
      { title: 'Submit the application and pay the premium', detail: 'Pay the insurer directly and keep the receipt and policy schedule.' },
      { title: 'Confirm pre-authorisation steps', detail: 'Ask for the phone number to call before a planned admission or joint replacement.' },
    ],
    source: null, lastVerified: null, demo: true,
  },
];

export const GLOSSARY: GlossaryEntry[] = [
  { id: 'premium', term: 'Premium', definition: 'The money you pay to keep the cover active. It can be paid weekly, monthly or yearly.', example: 'A premium of UGX 38,000 a month means you pay UGX 456,000 over a year, whether or not you claim.' },
  { id: 'benefit-limit', term: 'Benefit limit', definition: 'The most the insurer will pay for a particular benefit, or in total, over a stated period.', example: 'An inpatient limit of UGX 8,000,000 a year does not mean you get 8 million back — it is the ceiling on what the insurer will pay.' },
  { id: 'exclusion', term: 'Exclusion', definition: 'A condition, treatment or situation the policy will not pay for, even if it is medically necessary.', example: 'A plan may cover surgery but exclude cosmetic surgery. The exclusion decides, not the benefit list.' },
  { id: 'waiting-period', term: 'Waiting period', definition: 'A period after you join during which a benefit cannot be used.', example: 'Maternity with a 9-month waiting period means a birth in month five is not covered.' },
  { id: 'deductible', term: 'Deductible (excess)', definition: 'An amount you pay yourself before the insurer starts paying anything on a claim.', example: 'With a UGX 100,000 deductible on a UGX 600,000 bill, you pay the first 100,000 and the insurer considers the rest.' },
  { id: 'co-payment', term: 'Co-payment', definition: 'A fixed share of each bill that you pay, while the insurer pays the rest.', example: 'A 10% co-payment on a UGX 1,000,000 bill means you pay UGX 100,000.' },
  { id: 'outpatient', term: 'Outpatient care', definition: 'Treatment where you are seen and go home the same day — consultations, tests and medicines.', example: 'A clinic visit for malaria treatment is outpatient. Staying overnight in hospital is not.' },
  { id: 'inpatient', term: 'Inpatient care', definition: 'Treatment that requires you to be admitted to hospital, usually for more than 24 hours.', example: 'An appendix operation with an overnight stay is inpatient; the follow-up check is outpatient.' },
  { id: 'pre-authorisation', term: 'Pre-authorisation', definition: 'Permission from the insurer before treatment, so the bill is agreed in advance.', example: 'Calling the insurer before a planned operation. Without it, the claim can be refused.' },
  { id: 'policyholder', term: 'Policyholder', definition: 'The person or organisation that owns the policy and is responsible for paying the premium.', example: 'A company can be the policyholder while each employee is a covered member.' },
  { id: 'dependant', term: 'Dependant (beneficiary)', definition: "A family member covered under someone else's policy, or the person named to receive a benefit.", example: 'A spouse and children listed on a family plan are dependants. Each needs their own documents.' },
  { id: 'network', term: 'Network hospital', definition: 'A hospital or clinic with an agreement with the insurer, where the insurer can pay directly.', example: 'Going to a network hospital can mean cashless treatment; going outside it usually means paying first and claiming back.' },
  { id: 'cashless', term: 'Cashless treatment', definition: 'The insurer pays the hospital directly, so you do not have to find the money first.', example: 'Swiping a member card at a network hospital is cashless. Paying yourself and claiming later is reimbursement.' },
  { id: 'pre-existing', term: 'Pre-existing condition', definition: 'An illness or condition you already had before you joined the policy.', example: 'If you were diagnosed with hypertension before joining, it is pre-existing and may be excluded or delayed.' },
];

export const FAQS: FaqEntry[] = [
  { q: 'Can I use this website to buy a policy?', a: 'No. HealthCover Uganda explains and compares products, then points you to the insurer. It does not sell policies, collect premiums or complete enrolments.' },
  { q: 'Why is the premium missing on some plans?', a: 'Because the product information supplied does not include one. A missing premium is shown as "Premium not provided" rather than an invented figure. Ask the insurer for a written quote.' },
  { q: 'A plan does not mention dental cover. Does that mean it is excluded?', a: 'Not necessarily. A benefit that is not mentioned may be excluded, included, or subject to conditions. It is shown as "Check first" and you should confirm it with the insurer before enrolling.' },
  { q: 'Do I need an account or to enter my medical history?', a: 'No. You can browse and compare without an account, and the site never asks for medical information. Your comparison selection is stored only in your own browser.' },
  { q: 'What is a waiting period and why does it matter?', a: 'It is the time after joining before a benefit can be used. Maternity and pre-existing conditions often have long waits, so check them before you rely on the cover.' },
  { q: 'How do I know an agent is genuine?', a: 'Ask for the insurer they represent and confirm the arrangement directly with that insurer. Never pay a premium into a personal mobile money number, and always get a receipt.' },
];

export const ENROL_STEPS: EnrolStep[] = [
  { title: 'Identify your needs', detail: 'Decide who needs cover, which benefits matter most, and what you can pay each month without straining your household.' },
  { title: 'Compare available plans', detail: 'Put two or three plans side by side using the same fields, so differences in cover and limits are visible.' },
  { title: 'Read the benefits, exclusions and limits', detail: 'Exclusions decide what you will pay yourself. Limits decide how far the cover goes. Read both before the benefits.' },
  { title: 'Check eligibility and required documents', detail: 'Age bands, group size and dependant rules can rule a plan out. Confirm the document list before visiting an office.' },
  { title: 'Contact the insurer or an authorised intermediary', detail: 'Use the contact route listed for the plan. Ask for the exclusion list and benefit schedule in writing.' },
  { title: 'Confirm premiums, payment and unclear conditions', detail: 'Get the premium for your age, the payment method, and written answers to anything marked "Check first".' },
  { title: "Follow the insurer's official application process", detail: 'Complete their forms, pay only the insurer, keep every receipt, and note the date your waiting periods end.' },
];

export const SOURCES_NOTE = 'All product records on this site are demonstration data created for the UIA Career Expo 2026 challenge. No real insurer is represented, and no contact detail is in service.';

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function planById(id: string): Plan | null {
  return PLANS.find((p) => p.id === id) ?? null;
}

export function insurerById(id: string): Insurer | null {
  return INSURERS.find((i) => i.id === id) ?? null;
}

export interface PlanFilters {
  q: string;
  insurer: string;
  category: string;
  benefits: string[];
  premiumOnly: boolean;
  sort: 'recommended' | 'price-low' | 'price-high' | 'name';
}

export const defaultFilters = (): PlanFilters => ({
  q: '', insurer: 'all', category: 'all', benefits: [], premiumOnly: false, sort: 'recommended',
});

export function selectPlans(filters: Partial<PlanFilters>): Plan[] {
  const f: PlanFilters = { ...defaultFilters(), ...filters };
  const q = f.q.trim().toLowerCase();

  let list = PLANS.filter((p) => {
    if (f.insurer !== 'all' && p.insurerId !== f.insurer) return false;
    if (f.category !== 'all' && p.category !== f.category) return false;
    if (f.premiumOnly && !p.premium) return false;
    if (f.benefits.length && !f.benefits.every((g) => p.benefits.some((b) => b.group === g && b.status === 'covered'))) return false;
    if (q) {
      const hay = [p.planName, p.insurer, p.description, ...p.benefits.map((b) => b.name), ...p.exclusions.map((e) => e.name)].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  if (f.sort === 'price-low') list = [...list].sort((a, b) => (a.premium?.amount ?? Infinity) - (b.premium?.amount ?? Infinity));
  else if (f.sort === 'price-high') list = [...list].sort((a, b) => (b.premium?.amount ?? -1) - (a.premium?.amount ?? -1));
  else if (f.sort === 'name') list = [...list].sort((a, b) => a.planName.localeCompare(b.planName));
  return list;
}

export function activeFilterCount(f: Partial<PlanFilters>): number {
  let n = 0;
  if (f.insurer && f.insurer !== 'all') n++;
  if (f.category && f.category !== 'all') n++;
  if (f.premiumOnly) n++;
  n += (f.benefits ?? []).length;
  if (f.q?.trim()) n++;
  return n;
}

export function money(premium: Premium | null): string | null {
  if (!premium) return null;
  return `${premium.currency} ${premium.amount.toLocaleString('en-UG')}`;
}

export function frequencyLabel(premium: Premium | null, perMonth: string, perYear: string, perWeek: string): string {
  if (!premium) return '';
  const map: Record<string, string> = { month: perMonth, year: perYear, week: perWeek };
  return map[premium.frequency] ?? premium.frequency;
}

export function categoryLabel(id: string): string {
  const map: Record<string, string> = {
    individual: 'Individual', family: 'Family', 'self-employed': 'Self-employed',
    group: 'Group', senior: 'Senior',
  };
  return map[id] ?? id;
}
