export enum TabType {
  liked = "liked",
  received = "received",
  match = "match",
}

export const tabData = [
  {
    label: "🧡 Enviados",
    value: TabType.liked,
  },
  {
    label: "🧡 Recibidos",
    value: TabType.received,
  },
  {
    label: "Matches",
    value: TabType.match,
  },
];
