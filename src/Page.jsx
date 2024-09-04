import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import TaskBoard from "./components/AllTask/TaskBoard";


const Page = () => {
    return (
        <div className="bg-[#191D26] font-[Inter] text-white">
      <Header />
      <Hero />
      <TaskBoard />
      <Footer />
    </div>
    );
};

export default Page;