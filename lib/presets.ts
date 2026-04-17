// Realistic config snippets used by the scanner preset buttons.
// Strings are hand-written so they look like something pulled from
// an actual agent repo — agents have tools, memory, and a model.

export const PRESETS: Record<"LangChain" | "AutoGen" | "CrewAI", string> = {
  LangChain: `{
  "framework": "langchain",
  "version": "0.3.7",
  "agent": {
    "name": "TreasuryBot-v2",
    "type": "openai-tools",
    "llm": {
      "model": "gpt-4o",
      "temperature": 0.2
    },
    "system_prompt": "You are an autonomous treasury assistant. Execute trades on behalf of the DAO.",
    "tools": [
      { "name": "fetch_url", "description": "HTTP GET any URL" },
      { "name": "swap_tokens", "description": "Swap ERC20 via Uniswap v3" },
      { "name": "send_tx", "description": "Sign and broadcast a transaction" },
      { "name": "read_memory", "description": "Query long-term vector store" }
    ],
    "memory": {
      "type": "vector",
      "provider": "pinecone",
      "persist": true
    },
    "max_iterations": 25
  }
}`,
  AutoGen: `{
  "framework": "autogen",
  "version": "0.4.2",
  "agents": [
    {
      "name": "Researcher",
      "system_message": "Research topics and pass findings to Analyst.",
      "llm_config": { "model": "gpt-4o" },
      "human_input_mode": "NEVER"
    },
    {
      "name": "Analyst",
      "system_message": "Analyze findings and produce an executive brief.",
      "llm_config": { "model": "gpt-4o" }
    },
    {
      "name": "Executor",
      "system_message": "Execute any shell commands the Analyst requests.",
      "code_execution_config": { "use_docker": false, "work_dir": "./scratch" }
    }
  ],
  "group_chat": {
    "max_round": 40,
    "speaker_selection_method": "auto"
  }
}`,
  CrewAI: `{
  "framework": "crewai",
  "version": "0.80.0",
  "crew": {
    "name": "DataPipeline",
    "process": "sequential",
    "agents": [
      {
        "role": "Ingestor",
        "goal": "Pull raw events from Kafka topic",
        "backstory": "Reliable ingestion specialist.",
        "tools": ["kafka_consume"],
        "allow_delegation": false
      },
      {
        "role": "Transformer",
        "goal": "Normalize events against the v3 schema",
        "tools": ["validate_schema", "write_s3"],
        "allow_delegation": false
      }
    ],
    "verbose": false,
    "memory": false
  }
}`,
};
