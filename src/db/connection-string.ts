const SSL_MODES_ALIASED_TO_VERIFY_FULL = new Set(["prefer", "require", "verify-ca"]);

export function normalizePostgresConnectionString(connectionString: string): string {
  try {
    const url = new URL(connectionString);
    const sslmode = url.searchParams.get("sslmode");
    const useLibpqCompat = url.searchParams.get("uselibpqcompat");

    if (sslmode && SSL_MODES_ALIASED_TO_VERIFY_FULL.has(sslmode) && useLibpqCompat !== "true") {
      url.searchParams.set("sslmode", "verify-full");
      return url.toString();
    }

    return connectionString;
  } catch {
    return connectionString;
  }
}

export function getDatabaseUrl(): string {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required for the PostgreSQL database connection.");
  }

  return normalizePostgresConnectionString(connectionString);
}