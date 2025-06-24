const Footer = () => {
  return (
    <footer className="border-t backdrop-blur-md bg-[#b4a0ff]/10 dark:bg-[#1f1b2e]/30 py-6">
      <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 space-y-4">
        <div className="flex justify-center gap-6 text-sm flex-wrap">
          <a
            href="https://www.linkedin.com/in/anikesh-srivastav-57822b29a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-primary transition"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/anikesh-srivastav"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-primary transition"
          >
            GitHub
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=anikeshsrivastab@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-primary transition"
          >
            Contact Me
          </a>
          <a
            href="/AnikeshSrivastav_CV.pdf"
            download
            className="hover:underline hover:text-primary transition"
          >
            Download CV
          </a>
        </div>
        <p className="text-xs">Created in {new Date().getFullYear()} by Anikesh Srivastav.</p>
      </div>
    </footer>
  );
};

export default Footer;
