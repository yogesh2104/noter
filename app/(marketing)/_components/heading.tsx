"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Heading = () => {
    return ( 
        <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your ideas, and plans for a more organized and productive.<span className="underline">Noter App</span>
        </h1>
        <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Noter serves as the collaborative workspace where enhanced and more efficient work takes place.
        </h3>
        <Button>Enter Noter 
            <ArrowRight className="h-4 w-4 ml-2"/>
        </Button>
      </div>
     );
}
 
export default Heading;