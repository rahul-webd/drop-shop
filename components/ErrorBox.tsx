const ErrorBox = ({ message }: { message: string }) => {

    return (
        <article className="m-4 p-4 border border-red-300 text-red-600">
            { message || "an unknown error occured" }
        </article>
    )
}

export default ErrorBox;