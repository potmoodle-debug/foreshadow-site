window.FORESHADOW_THREADS = {
  threads: [
    {
      id: "clark",
      label: "Clark",
      description: "Follow Clark Apsley's disappearance, the sixpence, his home life, the attempts to reach him in 1979 and the evidence gathered around the adults near him.",
      keywords: ["clark", "apsley", "sixpence", "missing", "disappearance", "abduct", "abduction"]
    },
    {
      id: "bartholomew",
      label: "Bartholomew",
      description: "Follow Lionel Bartholomew from Ade's first suspicion through the 1979 house visits, retired-police evidence, named associates and Ade's late disclosure.",
      keywords: ["bartholomew", "fournier", "louw", "lombard", "armstrong", "judge", "cover-up", "abuse", "abused"]
    },
    {
      id: "surveillance",
      label: "Surveillance",
      description: "Follow the black vehicles, monitoring teams, hidden files, Shades and the organisation that says it has watched Jay and Ade for roughly thirty years.",
      keywords: ["surveillance", "shades", "organisation", "organization", "black van", "black car", "covert", "watched", "monitor", "files", "child operatives"]
    },
    {
      id: "susy",
      label: "Susy",
      description: "Follow Susy from the reunion through her police-intelligence background, her reconstruction of the old case, Albert and Jean, and the hit-and-run.",
      keywords: ["susy", "whitlock", "albert", "jean", "police", "hit-and-run", "hospital", "intelligence officer"]
    },
    {
      id: "pavahuasca",
      label: "Pavahuasca",
      description: "Follow Ade's discovery of Pavahuasca, the Hiding People, the physical effects, the return into younger bodies and the time-travel rules discussed on the page.",
      keywords: ["pavahuasca", "hiding people", "rainforest", "time travel", "time-travel", "younger", "whole", "infusion", "1979"]
    },
    {
      id: "interventions",
      label: "1979 interventions",
      description: "Follow the trips in which adult Jay and Ade act through their younger selves, test whether the past is real, visit Clark and interfere with events around Bartholomew.",
      keywords: ["1979", "young jay", "young ade", "trip", "past", "cigar tube", "younger bodies", "bartholomew-house", "school gates"]
    }
  ],
  relationships: [
    { from: "Jay Cadell", to: "Clark Apsley", status: "confirmed", text: "Childhood friends. Jay misses the arranged park meeting on the day Clark disappears and carries the guilt into adulthood." },
    { from: "Jay Cadell", to: "Adrian 'Ade' Laurier", status: "confirmed", text: "Childhood friends reunited in the present. Ade brings Jay into the investigation and into 1979 through Pavahuasca." },
    { from: "Jay Cadell", to: "Susy Whitlock", status: "confirmed", text: "Childhood friends. Jay was with Susy instead of meeting Clark on the day of the disappearance; they reconnect at the reunion." },
    { from: "Ade Laurier", to: "Clark Apsley", status: "confirmed", text: "Childhood friends. Ade makes preventing Clark's abduction the explicit purpose of taking Jay back to 1979." },
    { from: "Ade Laurier", to: "Lionel Bartholomew", status: "confirmed", text: "Ade investigates Bartholomew and later states that Bartholomew was among the adults who sexually abused him after Clark disappeared." },
    { from: "Clark Apsley", to: "Mr. Apsley", status: "confirmed", text: "Father and son. Jay and Ade visit Clark's home in 1979 and see his father receive Bartholomew and Armstrong." },
    { from: "Mr. Apsley", to: "Lionel Bartholomew", status: "confirmed", text: "Associates in the 1979 material. Bartholomew visits the Apsley house and is later named with Clark's father in Ade's account." },
    { from: "Susy Whitlock", to: "Albert McGregor / Jean Logan", status: "confirmed", text: "Susy uses her investigative background to find retired officers who remember suppressed evidence and the old Bartholomew case." },
    { from: "Shades / organisation", to: "Jay & Ade", status: "confirmed", text: "Shades states that the organisation has watched Jay and Ade for roughly thirty years and noticed the unexplained childhood violence." },
    { from: "Unknown child operatives", to: "Black van", status: "confirmed", text: "After escaping the Bartholomew-house incident, the highly trained children move toward a waiting black van." },
    { from: "Unknown child operatives", to: "Shades' organisation", status: "unresolved", text: "The screenplay does not yet explicitly identify the children as members of the same organisation represented by Shades." }
  ]
};
