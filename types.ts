export interface Message {
  role: 'user' | 'model';
  text: string;
  section: Section;
}

export enum Section {
  Intro,
  Passion,
  Skills,
  WorldNeeds,
  Monetization,
  Analysis,
  Results,
  Conclusion
}