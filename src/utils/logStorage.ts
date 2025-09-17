const logs: string[] = []

export const saveLog = (log: string) => {
    logs.push(log)
}

export const getLogs = () => logs
