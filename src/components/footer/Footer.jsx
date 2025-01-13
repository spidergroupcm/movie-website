import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mx-auto ">
      <div className="px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <img src={logo} alt="Logo" className="w-20 h-20 mb-4" />
          <p className="text-gray-300 text-sm">
            Welcome to Movie Flix, your ultimate destination for the latest movies, top-rated films, and must-watch classics.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                All Movies
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Add Movie
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                My Favorites
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Upcoming Releases
              </a>
            </li>
          </ul>
        </div>

        {/* Popular Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Action
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Drama
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Comedy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Sci-Fi
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Horror
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Email: support@movieflix.com</li>
            <li>Phone: +1 (123) 456-7890</li>
            <li>Address: 123 Movie St, Hollywood, CA</li>
          </ul>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaYoutube size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Horizontal Line and Copyright */}
      <div className="border-t border-gray-700 mt-8 py-4 text-center">
        <p className="text-gray-400 text-sm">
          © 2024 Movie Flix. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
