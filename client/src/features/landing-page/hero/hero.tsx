import { buttonVariants } from "@/components/ui/button";
import Container from "@/layout/container/container";
import LandingNavbar from "@/layout/layout-landing/landing-navbar/landing-navbar";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="h-[80vh] relative overflow-hidden">
      <header>
        <LandingNavbar />
      </header>
      <Container className="flex justify-start items-center h-full">
        <div className="text-start flex flex-col gap-10 -mt-[10%] z-50">
          <div>
            <h1 className="text-5xl font-bold mb-3">Simplify Your Job Hunt</h1>
            <p className="text-muted-foreground text-xl font-semibold">
              Track Your Job Applications Effortlessly and For Free.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="max-w-xl text-muted-foreground">
              Say goodbye to cluttered spreadsheets and costly subscription
              fees. Our Job Application Tracker is designed to streamline your
              job search process with an intuitive, user-friendly interface.
              Manage applications, follow-ups, and offers in one place, so you
              can focus on landing your dream job.
            </p>
            <div className="flex gap-3 items-center">
              <Link
                to="/signup"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "drop-shadow"
                )}
              >
                Sign up for free
              </Link>
              <Link
                to="/signup"
                className={buttonVariants({ variant: "outline" })}
              >
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
        {/* <div className="absolute w-[80rem] h-[80rem] rounded-3xl drop-shadow-2lxl bg-foreground z-[10] -right-[20%] rotate-[50deg] -top-[130%]"></div>
        <div className="absolute w-[80rem] h-[80rem] rounded-3xl drop-shadow-2lxl bg-primary z-[9] -right-[18%] rotate-[55deg] -top-[130%]"></div> */}
      </Container>
    </section>
  );
};

export default Hero;
