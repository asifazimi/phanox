// Logo
import LogoImage from "../Logo";

const footerNavigation = {
  bottomas: [
    { name: "Accessibility", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer aria-labelledby="footer-heading" className="bg-white">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="border-t border-gray-200"></div>

        <div className="py-10 md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} All Rights Reserved
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center md:mt-0">
            <div className="flex space-x-8">
              {footerNavigation.bottomas.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-gray-500 hover:text-gray-600"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
