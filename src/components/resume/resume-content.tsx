export function ResumeContent() {
    return (
        <div className="mx-auto max-w-[210mm] bg-white p-8 md:p-12 shadow-sm print:max-w-none print:p-0 print:shadow-none dark:bg-[#1a1a1a] dark:text-gray-100">
            {/* Header */}
            <header className="mb-8 border-b border-gray-200 pb-8 dark:border-gray-800">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Nilesh Developer</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Senior Software Engineer</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>San Francisco, CA</span>
                    <span>•</span>
                    <a href="mailto:hello@example.com" className="hover:text-gray-900 dark:hover:text-white">
                        hello@example.com
                    </a>
                    <span>•</span>
                    <a href="https://github.com" className="hover:text-gray-900 dark:hover:text-white">
                        github.com/nilesh
                    </a>
                </div>
            </header>

            {/* Summary */}
            <section className="mb-8">
                <h2 className="mb-4 text-xl font-bold uppercase tracking-wider text-gray-900 dark:text-white">Summary</h2>
                <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                    Experienced software engineer with a strong background in distributed systems and frontend architecture.
                    Proven track record of delivering scalable solutions and mentoring junior developers.
                    Passionate about clean code, performance optimization, and user experience.
                </p>
            </section>

            {/* Experience */}
            <section className="mb-8">
                <h2 className="mb-4 text-xl font-bold uppercase tracking-wider text-gray-900 dark:text-white">Experience</h2>
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-gray-900 dark:text-white">Senior Software Engineer</h3>
                            <span className="text-sm text-gray-600 dark:text-gray-400">2023 - Present</span>
                        </div>
                        <div className="text-gray-700 dark:text-gray-300 mb-2">Tech Corp</div>
                        <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                            <li>Architected and led the migration of main product dashboard to Next.js, improving load times by 40%.</li>
                            <li>Designed and implemented a reusable component library used across 5 different internal products.</li>
                            <li>Optimized CI/CD pipelines, reducing build times by 50%.</li>
                        </ul>
                    </div>

                    <div>
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-gray-900 dark:text-white">Software Engineer</h3>
                            <span className="text-sm text-gray-600 dark:text-gray-400">2021 - 2023</span>
                        </div>
                        <div className="text-gray-700 dark:text-gray-300 mb-2">Startup Inc</div>
                        <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                            <li>Developed core payment processing service handling over $1M in monthly transactions.</li>
                            <li>Implemented comprehensive testing strategy, increasing code coverage from 40% to 90%.</li>
                            <li>Mentored 2 junior engineers and conducted weekly code review sessions.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Education */}
            <section className="mb-8">
                <h2 className="mb-4 text-xl font-bold uppercase tracking-wider text-gray-900 dark:text-white">Education</h2>
                <div>
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-gray-900 dark:text-white">BS Computer Science</h3>
                        <span className="text-sm text-gray-600 dark:text-gray-400">2015 - 2019</span>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300">University of Technology</div>
                </div>
            </section>

            {/* Skills */}
            <section>
                <h2 className="mb-4 text-xl font-bold uppercase tracking-wider text-gray-900 dark:text-white">Skills</h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex justify-between">
                        <span className="font-medium">Languages</span>
                        <span>TypeScript, Go, Python, SQL</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Frontend</span>
                        <span>React, Next.js, Tailwind, Framer Motion</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Backend</span>
                        <span>Node.js, PostgreSQL, Docker, AWS</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Tools</span>
                        <span>Git, Kubernetes, Terraform, Figma</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
