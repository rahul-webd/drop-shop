import { NextPage } from "next";
import Link from "next/link";
import H2 from "../components/H2";
import { Tool } from "../schemas/global";

const Tools: NextPage = () => {
    const tools: Tool[] = [
        {
            name: 'CPU Boost',
            path: '/cpu-boost',
            image: undefined,
            bgColor: 'bg-blue-300',
            textColor: 'text-blue-900'
        }
    ]

    return (
        <section>
            {
                tools.map(({ name, path, image, bgColor, 
                    textColor }: Tool, i: number) => {

                    return (
                        <Tool name={name} path={path} image={image}
                            bgColor={bgColor} textColor={textColor}
                            key={i} />
                    )
                })
            }
        </section>
    )
}

const Tool = ({ name, path, image, bgColor, textColor }: Tool) => {

    return (
        <section className={`m-4 rounded-xl shadow-lg
            flex ${bgColor}`}>
            <Link href={path}>
                <a className="w-full">
                    <div className="p-8">
                        <H2
                            text={name}
                            className={`${textColor}`} />
                    </div>
                </a>
            </Link>
        </section>
    )
}

export default Tools;