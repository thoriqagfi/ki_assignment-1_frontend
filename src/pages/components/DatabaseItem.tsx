"use client"

export async function getServerSideProps() {
  try {
    // API endpoint not yet implemented
    const response = await fetch("http://localhost");
    const data = await response.json();
    return {
      props: {
        items: data,
      },
    };
  } catch (error) {
    console.error('Error fetching file, ', error);
    return {
      props: {
        items: [],
      },
    };
  }
}

export default function DatabaseItem() {
  return (
    <div>This element from DatabaseItem's component!</div>
  )
}