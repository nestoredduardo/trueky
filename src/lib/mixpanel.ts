import mixpanel from "mixpanel-browser";
import { env } from "@/env/client.mjs";

mixpanel.init(env.NEXT_PUBLIC_MIXPANEL_TOKEN);

export default mixpanel;
