const About: React.FC = () => {
  return (
    <div className="px-4 sm:px-8 md:text-lg">
      <h1 className="py-8 text-4xl">Vivid Craft</h1>
      <p className="lg:mr-40 ">
        Vivid Craft is a software company that aims to fuse creative art and
        architecture with precise code to provide a digital user experience that
        goes beyond simple usability, transforming experiences into digital art.
      </p>
      <br />
      <p>
        Their application features a rich <strong>IMAGE GALLERY</strong> where
        users can:
        <ul className="ml-10 list-disc">
          <li> Upload images</li>
          <li> View uploaded images</li>
          <li> Add favorite images to a personal collection</li>
          <li> Download images for personal use</li>
        </ul>
        <br />
        The images showcased are all open source and free to use. They can be
        displayed by category, and users can add tags for improved search
        functionality. Additionally, users can see the number of "likes"
        (favorites) for each image.
      </p>
    </div>
  );
};

export default About;
