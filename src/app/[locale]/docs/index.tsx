import Button from "@/components/buttons/Button";
import { GetServerSideProps } from "next";
import React from "react"

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  }
}


const Docs = () => {
  return (
    <>
      <h2 className="mb-4 font-bold text-3xl uppercase bg-white text-violet-600">Buttons</h2>
      <h4 className="mb-4 font-bold text-gray-1700 text-2xl">Primary</h4>

      <div className="flex gap-2">
        <Button as="button" uiColor="primary" variant="contained">
          Contained
        </Button>
        <Button as="button" uiColor="primary" variant="outlined">
          Outlined
        </Button>
        <Button as="button" uiColor="primary" variant="contained" disabled>
          Contained
        </Button>
        <Button as="button" uiColor="primary" variant="outlined" disabled>
          Outlined
        </Button>
      </div>

      <h4 className="mt-4 mb-4 font-bold text-gray-1700 text-2xl">Danger</h4>

      <div className="flex gap-2">
        <Button as="button" uiColor="danger" variant="contained">
          Contained
        </Button>
        <Button as="button" uiColor="danger" variant="outlined">
          Outlined
        </Button>
        <Button as="button" uiColor="danger" variant="contained" disabled>
          Contained
        </Button>
        <Button as="button" uiColor="danger" variant="outlined" disabled>
          Outlined
        </Button>
      </div>
      <h2 className="mb-4 font-bold text-gray-1700 text-3xl">Links</h2>

      <h4 className="mb-4 font-bold text-gray-1700 text-2xl">Primary</h4>

      <div className="flex gap-2">
        <Button href="/" as="link" uiColor="primary" variant="contained">
          Contained
        </Button>
        <Button href="/" as="link" uiColor="primary" variant="outlined">
          Outlined
        </Button>
        <Button href="/" as="link" uiColor="primary" variant="contained">
          Contained
        </Button>
        <Button href="/" as="link" uiColor="primary" variant="outlined">
          Outlined
        </Button>
      </div>

      <h4 className="mt-4 mb-4 font-bold text-gray-1700 text-2xl">Danger</h4>

      <div className="flex gap-2">
        <Button href="https://www.google.com/" as="link" uiColor="danger" variant="contained">
          Contained
        </Button>
        <Button href="/" as="link" uiColor="danger" variant="outlined">
          Outlined
        </Button>
        <Button href="/" as="link" uiColor="danger" variant="contained" >
          Contained
        </Button>
        <Button href="/" as="link" uiColor="danger" variant="outlined">
          Outlined
        </Button>
      </div>

    </>
  )
};

export default Docs;
