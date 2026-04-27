import Cards from "./components/Cards/Cards";
import Connect from "./components/Connect/Connect";
import Feedback from "./components/Feedback/Feedback";
import Influencers from "./components/Influencers/Influencers";
import Intro from "./components/Intro/Intro";
import Manage from "./components/Manage/Manage";
import More from "./components/More/More";
import Share from "./components/Share/Share";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Intro />
      <Influencers />
      <Share />
      <More />
      <Manage />
      <Connect />
      <Cards />
      <Feedback />
    </main>
  );
}
