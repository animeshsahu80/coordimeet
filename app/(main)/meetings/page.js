import { getUserMeetings } from "@/app/actions/meetings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React, { Suspense } from "react";
import MeetingsList from "./_components/meetings-list";

const Meetings = () => {
  return (
    <Tabs defaultValue="upcoming" className="w-full">
      {/* Tabs List */}
      <TabsList className="flex border-b border-gray-300 mb-4">
        <TabsTrigger
          value="upcoming"
          className="flex-1 text-center py-2 text-gray-600 hover:text-gray-800 font-medium border-b-2 border-transparent transition-all focus:outline-none data-[state=active]:text-blue-600 data-[state=active]:border-blue-600"
        >
          Upcoming
        </TabsTrigger>
        <TabsTrigger
          value="past"
          className="flex-1 text-center py-2 text-gray-600 hover:text-gray-800 font-medium border-b-2 border-transparent transition-all focus:outline-none data-[state=active]:text-blue-600 data-[state=active]:border-blue-600"
        >
          Past
        </TabsTrigger>
      </TabsList>

      {/* Upcoming Meetings Content */}
      <TabsContent value="upcoming" className="p-4 bg-white shadow rounded">
        <Suspense fallback={<div>Loading upcoming meetings...</div>}>
          <UpcomingMeetings />
        </Suspense>
      </TabsContent>

      {/* Past Meetings Content */}
      <TabsContent value="past" className="p-4 bg-white shadow rounded">
        <Suspense fallback={<div>Loading past meetings...</div>}>
          <PastMeetings />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
};
async function UpcomingMeetings() {
  const meetings = await getUserMeetings("upcoming");
  return <MeetingsList meetings={meetings} type="upcoming" />;
}

async function PastMeetings() {
  const meetings = await getUserMeetings("past");
  return <MeetingsList meetings={meetings} type="past" />;
}
export default Meetings;
