Database table til en user_challenge (
-- Core Fields
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
submission_status VARCHAR(20) NOT NULL DEFAULT 'pending_review',
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
photo_url TEXT NOT NULL, -- encrypted path to secure storage
photo_hash VARCHAR(64) NOT NULL, -- hash for duplicate detection
moderation_status VARCHAR(30) NOT NULL DEFAULT 'afventer anmeldelse',
reviewed_by UUID REFERENCES moderators(id),
reviewed_at TIMESTAMP,
rejection_reason TEXT,
parent_consent BOOLEAN NOT NULL DEFAULT FALSE,
);

### Håndtering af billeder af børn

#### Safety Logic – Billedets livscyklus

**1. Før upload (på enheden):**
Forældrenes  samtykke indhentes og gemmes. Al metadata fjernes lokalt på enheden før upload.

**2. Upload:**
Billedet krypteres end-2-end og til sikker cloud storage. Der genereres en unikt hash til at forebyggelse duplikering.

**3. Moderation (afventer anmeldelse):**
Billedet forbliver usynligt og i status "afventer anmeldelse" indtil en verificeret moderator gennemgår indholdet. Moderatoren verificerer at billedet overholder GDPR om børnebeskyttelse.

**4. Godkendelse eller afvisning:**
Ved godkendelse opdateres status og billedet bliver synligt. Ved afvisning logges begrundelse, og billedet slettes. Alle handlinger logges med tidsstempel og ID på mederator.

**5. Opbevaring:**
Billeder opbevares krypteret. Sletning kan foretages af forældre/værge til enhver tid. Her slettes billedet fuldstædigt og må ikke bare gøre usynligt for bruger.
