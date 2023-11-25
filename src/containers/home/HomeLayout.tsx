// Inside the HomeLayout component
import React, { useState } from "react";
import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Box,
  Grid,
} from "@chakra-ui/react";
import RequisitionForm from "./RequisitionDetailsForm";
import JobDetailsForm from "./JobDetailsForm";
import InterviewSettingsForm from "./InterviewSettingsForm";
import DisplayCard from "./PreviewCard";

interface CustomTabProps {
  children: React.ReactNode;
  onClick: () => void;
}

const CustomTab: React.FC<CustomTabProps> = ({ children, onClick }) => {
  return (
    <Tab p="1rem" fontFamily="Poppins" onClick={onClick}>
      {children}
    </Tab>
  );
};

const HomeLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const handleNext = () => {
    // You can add additional logic here if needed
    setActiveTab((prevTab) => prevTab + 1);
  };

  const handlePrevious = () => {
    setActiveTab((prevTab) => Math.max(prevTab - 1, 0));
  };

  const renderFormComponent = () => {
    switch (activeTab) {
      case 0:
        return <RequisitionForm onNext={handleNext} />;
      case 1:
        return <JobDetailsForm onPrevious={handlePrevious} onNext={handleNext} />;
      case 2:
        return <InterviewSettingsForm onPrevious={handlePrevious} onSubmit={handleAsyncSubmit} />
      default:
        return null;
    }
  };

  const handleAsyncSubmit = async () => {
    // Your asynchronous submission logic
  };
  
  

  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs isLazy>
          <TabList>
            <CustomTab onClick={() => handleTabClick(0)}>Requisition Details</CustomTab>
            <CustomTab onClick={() => handleTabClick(1)}>Job Details</CustomTab>
            <CustomTab onClick={() => handleTabClick(2)}>Interview Settings</CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>{renderFormComponent()}</TabPanel>
            </TabPanels>
            <DisplayCard />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
