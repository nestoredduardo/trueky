export enum TabType {
  liked = "liked",
  received = "received",
  match = "match",
}

export const tabData = [
  {
    label: "Likes enviados",
    value: TabType.liked,
  },
  {
    label: "Likes recibidos",
    value: TabType.received,
  },
  {
    label: "Matches",
    value: TabType.match,
  },
];
