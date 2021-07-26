import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
            media="print"
            onLoad="this.media='all'"
          />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta
            name="description"
            content="Your one stop solution for high quality fabrics. 
              With decades of experience in manufacturing fabrics, we deliver in large
              scale within India and overseas. Our array of existing products include 
              woven bedsheets, napkins, shawl, kerchief, DC jaquard etc made from pure 
              cotton, yarn, polyester and acrylic. Contact us for bulk custom orders."
          ></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
