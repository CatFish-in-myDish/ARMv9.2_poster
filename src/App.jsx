import './App.css'

function App() {
  return (
    <div className="poster">
      <Header />
      <Subbar />
      <div className="body">
        <Column1 />
        <Column2 />
        <RightSide />
      </div>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <div className="hdr">
      <div className="hdr-left">
        <h1><em>ARM</em>v9.2-A Architecture <span style={{ fontSize: '30px', color: '#00B4DB', fontWeight: '600' }}>(AArch64)</span></h1>
        <div className="sub">23CSE213 · Computer Organization & Architecture · B.Tech CSE 2024–28 · Semester 4</div>
      </div>
      <div className="hdr-specs">
        <div className="sp"><strong>Arch:</strong> AArch64 · A64 ISA · Exception Levels EL0–EL3</div>
        <div className="sp"><strong>Security:</strong> Non-Secure · Secure · Realm · Root (RME)</div>
        <div className="sp"><strong>Memory:</strong> VMSAv8-64 · Stage 1 & Stage 2 Translation · Up to 52-bit PA</div>
        <div className="sp"><strong>Features:</strong> SVE2 · SME · MTE · PAC · BTI · TME · BRBE</div>
      </div>
      <div className="hdr-logo">
        <div className="arm-logo">ARM™</div>
      </div>
    </div>
  )
}

function Subbar() {
  return (
    <div className="subbar">
      <div className="sb-item"><span className="sbd" style={{ background: '#00B4DB' }}></span><strong>ISA:</strong> 64-bit fixed-width · AArch64 execution state</div>
      <div className="sb-item"><span className="sbd" style={{ background: '#4ade80' }}></span><strong>Registers:</strong> 31× 64-bit GPRs + SP + PC + V/Z/ZA</div>
      <div className="sb-item"><span className="sbd" style={{ background: '#f59e0b' }}></span><strong>Translation:</strong> MMU with Stage-1 & Stage-2 support</div>
      <div className="sb-item"><span className="sbd" style={{ background: '#a78bfa' }}></span><strong>Security:</strong> Non-Secure · Secure · Realm · Root (RME)</div>
      <div className="sb-item"><span className="sbd" style={{ background: '#fb923c' }}></span><strong>Debug:</strong> PMU · Debug & Trace Architecture (CoreSight)</div>
    </div>
  )
}


function Card({ title, headerClass, grow, children }) {
  return (
    <div className={`card ${grow ? 'grow' : ''}`}>
      <div className={`ch ${headerClass}`}>{title}</div>
      <div className="cb">
        {children}
      </div>
    </div>
  )
}

function Column1() {
  return (
    <div className="col">
      <Card title="Architecture Overview" headerClass="ch-blue">
        <div className="hl">
          <strong>ARMv9.2-A</strong> is a 64-bit RISC architecture (AArch64) featuring
          <strong> RME</strong> for confidential compute, <strong>SME</strong> for accelerated matrix operations, and
          <strong> SVE2</strong> for scalable vectorisation.
        </div>
        <CoaArchitecture />
        <div className="sg">
          <StatBox label="Execution State" value="AArch64 ONLY" />
          <StatBox label="Virtual Addressing" value="Up to 64-bit VAs" />
          <StatBox label="Physical Addressing" value="Up to 52-bit PAs" />
          <StatBox label="Translation Levels" value="Up to 4 levels" />
        </div>
      </Card>
      <Card title="Register Structure (AArch64)" headerClass="ch-cyan" grow>
        <CoaRegisters />
        <RegisterTable />
      </Card>
    </div>
  )
}

function Column2() {
  return (
    <div className="col">
      <Card title="ISA Instruction Types (A64)" headerClass="ch-navy">
        <InstructionTypeTable />
      </Card>
      <Card title="Instruction Formats (Architectural Class)" headerClass="ch-blue">
        <p style={{ fontSize: '10.8px', color: '#334155', marginBottom: '4px' }}>
          ARMv9.2-A instructions are <b>32 bits wide</b>. Formats are logically classed by operand type:
        </p>

        <h4 style={{ margin: '4px 0 2px' }}>R-Type — Register–Register &nbsp;<span style={{ fontWeight: 400, color: '#64748B' }}>(ADD, SUB, AND, ORR…)</span></h4>
        <div className="fmt-row" style={{ margin: '2px 0' }}>
          <div className="fmt-seg fs-op" style={{ flex: 11 }}>Opcode<br />11b</div>
          <div className="fmt-seg fs-rm" style={{ flex: 5 }}>Rm<br />5b</div>
          <div className="fmt-seg fs-sh" style={{ flex: 6 }}>Shift<br />6b</div>
          <div className="fmt-seg fs-rn" style={{ flex: 5 }}>Rn<br />5b</div>
          <div className="fmt-seg fs-rd" style={{ flex: 5 }}>Rd<br />5b</div>
        </div>

        <h4 style={{ margin: '4px 0 2px' }}>I-Type — Immediate &nbsp;<span style={{ fontWeight: 400, color: '#64748B' }}>(ADDI, SUBI, MOVZ, MOVK…)</span></h4>
        <div className="fmt-row" style={{ margin: '2px 0' }}>
          <div className="fmt-seg fs-op" style={{ flex: 10 }}>Opcode<br />10b</div>
          <div className="fmt-seg fs-im" style={{ flex: 12 }}>Immediate<br />12b</div>
          <div className="fmt-seg fs-rn" style={{ flex: 5 }}>Rn<br />5b</div>
          <div className="fmt-seg fs-rd" style={{ flex: 5 }}>Rd<br />5b</div>
        </div>

        <h4 style={{ margin: '4px 0 2px' }}>D-Type — Load / Store &nbsp;<span style={{ fontWeight: 400, color: '#64748B' }}>(LDR, STR, LDUR, STUR…)</span></h4>
        <div className="fmt-row" style={{ margin: '2px 0' }}>
          <div className="fmt-seg fs-op" style={{ flex: 11 }}>Opcode<br />11b</div>
          <div className="fmt-seg fs-of" style={{ flex: 9 }}>Offset<br />9b</div>
          <div className="fmt-seg fs-op2" style={{ flex: 2 }}>Op<br />2b</div>
          <div className="fmt-seg fs-rn" style={{ flex: 5 }}>Rn<br />5b</div>
          <div className="fmt-seg fs-rd" style={{ flex: 5 }}>Rt<br />5b</div>
        </div>

        <h4 style={{ margin: '4px 0 2px' }}>CB-TYPE — Compare & Branch &nbsp;<span style={{ fontWeight: 400, color: '#64748B' }}>(CBZ, CBNZ)</span></h4>
        <div className="fmt-row" style={{ margin: '2px 0' }}>
          <div className="fmt-seg fs-op" style={{ flex: 8 }}>Opcode<br />8b</div>
          <div className="fmt-seg fs-rd" style={{ flex: 5 }}>Rt<br />5b</div>
          <div className="fmt-seg fs-of" style={{ flex: 19 }}>PC-Relative Offset · 19b</div>
        </div>

        <h4 style={{ margin: '4px 0 2px' }}>TB-TYPE — Test Bit & Branch &nbsp;<span style={{ fontWeight: 400, color: '#64748B' }}>(TBZ, TBNZ)</span></h4>
        <div className="fmt-row" style={{ margin: '2px 0' }}>
          <div className="fmt-seg fs-op" style={{ flex: 6 }}>Opcode<br />6b</div>
          <div className="fmt-seg fs-rd" style={{ flex: 5 }}>Rt<br />5b</div>
          <div className="fmt-seg fs-sh" style={{ flex: 6 }}>Bit pos<br />6b</div>
          <div className="fmt-seg fs-of" style={{ flex: 15 }}>PC-Relative Offset · 15b</div>
        </div>

        <h4 style={{ margin: '4px 0 2px' }}>B-Type — Branch &nbsp;<span style={{ fontWeight: 400, color: '#64748B' }}>(B, BL, B.cond, BLR…)</span></h4>
        <div className="fmt-row" style={{ margin: '2px 0' }}>
          <div className="fmt-seg fs-op" style={{ flex: 6 }}>Opcode<br />6b</div>
          <div className="fmt-seg fs-of" style={{ flex: 26 }}>PC-Relative Offset &nbsp;·&nbsp; 26 bits</div>
        </div>

        <h4 style={{ margin: '4px 0 2px' }}>SYSTEM-TYPE — System / Control &nbsp;<span style={{ fontWeight: 400, color: '#64748B' }}>(MSR, MRS, HINT, ERET)</span></h4>
        <div className="fmt-row" style={{ margin: '2px 0' }}>
          <div className="fmt-seg fs-op" style={{ flex: 10 }}>Opcode<br />10b</div>
          <div className="fmt-seg fs-im" style={{ flex: 22 }}>System Register / Immediate · 22b</div>
        </div>
      </Card>
      <Card title="Addressing Modes (A64)" headerClass="ch-cyan">
        <div className="ac-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
          <div className="ac-chip" style={{ padding: '2px' }}>Base Reg<br />[Xn]</div>
          <div className="ac-chip" style={{ padding: '2px' }}>Imm Offset<br />[Xn, #imm]</div>
          <div className="ac-chip" style={{ padding: '2px' }}>Reg Offset<br />[Xn, Xm]</div>
          <div className="ac-chip" style={{ padding: '2px' }}>Pre-Index<br />[Xn, #imm]!</div>
          <div className="ac-chip" style={{ padding: '2px' }}>Post-Index<br />[Xn], #imm</div>
          <div className="ac-chip" style={{ padding: '2px' }}>Reg Extend<br />[Xn, Wm, SXTW / UXTW]</div>
        </div>
        <div className="ac-grid" style={{ gridTemplateColumns: '1fr 1.2fr', gap: '2px', marginTop: '2px' }}>
          <div className="ac-chip" style={{ padding: '2px' }}>PC-Relative Load<br />LDR Xt, label (via ADRP + ADD)</div>
          <div className="ac-chip" style={{ padding: '2px' }}>Pair Addressing<br />LDP / STP [Xn, #imm]</div>
        </div>
        {/* <br /> */}
        <p style={{ marginTop: '4px', fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
          <strong>A64 Logic:</strong> ADRP provides ±4GB range. <strong>Pre/Post-index</strong> simplify pointer arithmetic. <strong>Register Extend</strong> allows offset extension.
        </p>
      </Card>

      <ISAClarification />
    </div >
  )
}

function RightSide() {
  return (
    <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <Card title="Datapath Diagram & Flow (Generic ARMv9.2-A Core — Conceptual)" headerClass="ch-dark">
        <CoaDatapath />
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', flex: 1 }}>
        <div className="col">
          <Card title="Key Processor Features" headerClass="ch-dark">
            {[
              ["Realm Mgmt Extension (RME)", "Architectural isolation: Root, Realm, Secure, Non-Secure states for hardware-based trust.Enables dynamic, attestable Trusted Execution Environments (Arm CCA)."],
              ["SME — Scalable Matrix Ext.", "Introduces 2D ZA tile register file and outer-product instructions for matrix acceleration. Optimized for high-performance AI, ML, and DSP workloads via Streaming SVE mode."],
              ["SVE2 — Scalable Vector Ext. v2", "Vector-length agnostic (VLA) SIMD (128–2048 bits) with per-lane predication and multi-length support. Enhances ARMv8-A SVE with new instructions for DSP, cryptography, and bit manipulation."],
              ["Memory Tagging Ext. (MTE)", "Hardware-assisted memory safety: detects use-after-free and buffer overflows via pointer/memory tags."],
              ["Pointer Authentication (PAC)", "Cryptographic signatures on pointers to mitigate Return/Jump-Oriented Programming (ROP/JOP) attacks."],
              ["Branch Target ID (BTI)", "Enforces that indirect branches target marked instructions to limit gadget-based exploitation."],
              ["Guarded Control Stack (GCS)", "Hardware-enforced stack for return addresses to prevent ROP-style control-flow subversion."],
              ["BRBE — Branch Record Buffer", "Captures recent control path history in hardware for optimized debugging and profiling."],
              ["SPE — Stat. Profiling Ext.", "Hardware-assisted statistical sampling of instructions, memory latency, and branch behavior."],
              ["Transactional Memory (TME)", "Architectural support for Lock Elision and Transactional execution to enhance multi-core concurrency."],
              ["Enhanced PMU (PMU+)", "Advanced Performance Monitor Units with support for hundreds of events and cycle-accurate tracking."],
              ["Data Independent Timing (DIT)", "Ensures instruction execution time is independent of data values to mitigate timing side-channels. Crucial for constant-time cryptographic algorithms to prevent information leakage through execution-time variance."],
              // ["Side-Channel Mitigations", "Hardened speculative execution guards (CSV2, CSV3) to prevent Spectre-class vulnerabilities."]
            ].map(([title, desc], idx) => (
              <div className="fi" key={idx} style={{ marginBottom: '3px' }}>
                <div className="fi-t" style={{ fontSize: '9px', lineHeight: '1.2' }}>
                  <strong>{title}</strong>
                  <span style={{ whiteSpace: 'pre-line' }}>{desc}</span>
                </div>
              </div>
            ))}
          </Card>
        </div>

        <div className="col">
          <Card title="Standard Architectural Pipeline Stages" headerClass="ch-blue">
            <div className="pipe-wrap" style={{ margin: '3px 0' }}>
              <div className="pipe-box pb1" style={{ position: 'relative' }}>
                IF<span className="pipe-sub">Instruction Fetch</span>
                <div style={{ fontSize: '7.5px', color: 'rgba(255,255,255,0.9)', marginTop: '2px', lineHeight: 1.1 }}>PC update, branch prediction</div>
              </div>
              <div className="pipe-box pb2">
                ID<span className="pipe-sub">Instruction Decode</span>
                <div style={{ fontSize: '7.5px', color: 'rgba(255,255,255,0.9)', marginTop: '2px', lineHeight: 1.1 }}>Register read, imm. extract</div>
              </div>
              <div className="pipe-box pb3">
                EX<span className="pipe-sub">Execute</span>
                <div style={{ fontSize: '7.5px', color: 'rgba(255,255,255,0.9)', marginTop: '2px', lineHeight: 1.1 }}>ALU ops, branch eval, addr calc</div>
              </div>
              <div className="pipe-box pb4">
                MEM<span className="pipe-sub">Memory Access</span>
                <div style={{ fontSize: '7.5px', color: 'rgba(255,255,255,0.9)', marginTop: '2px', lineHeight: 1.1 }}>Load/store, memory ordering</div>
              </div>
              <div className="pipe-box pb5">
                WB<span className="pipe-sub">Write-back</span>
                <div style={{ fontSize: '7.5px', color: 'rgba(255,255,255,0.9)', marginTop: '2px', lineHeight: 1.1 }}>Register write-back</div>
              </div>
              <div className="pipe-box pb6">
                CMT<span className="pipe-sub">Commit</span>
                <div style={{ fontSize: '7.5px', color: 'rgba(255,255,255,0.9)', marginTop: '2px', lineHeight: 1.1 }}>Architectural state (in-order)</div>
              </div>
            </div>

            <div style={{ marginTop: '8px', padding: '6px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
              <div style={{ fontSize: '9px', fontWeight: '800', color: '#1e293b', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #cbd5e1', paddingBottom: '2px' }}>
                Pipeline Characteristics
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '8.5px', color: '#475569' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3b82f6' }}></div>
                  In-order architectural commit
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3b82f6' }}></div>
                  Out-of-order execution (impl)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3b82f6' }}></div>
                  Register renaming (ISA-transparent)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3b82f6' }}></div>
                  Precise exceptions
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3b82f6' }}></div>
                  Speculative execution (impl)
                </div>
              </div>
            </div>

            <div style={{ marginTop: '8px', padding: '6px', borderLeft: '3px solid #3b82f6', background: '#eff6ff', borderRadius: '2px' }}>
              <div style={{ fontSize: '9px', fontWeight: '800', color: '#1e40af', marginBottom: '2px' }}>ARMv9.2 Pipeline Notes</div>
              <ul style={{ margin: 0, paddingLeft: '12px', fontSize: '8.5px', color: '#1e40af', lineHeight: 1.4 }}>
                <li>SVE2 / SME execute primarily in EX stage</li>
                <li>RME affects control logic & state commit</li>
                <li>MTE checks integrated with MEM access stage</li>
              </ul>
            </div>

            <div className="sg3" style={{ marginTop: '8px' }}>
              <StatBox label="Vector Support" value="SVE2 / SME" />
              <StatBox label="Memory Safety" value="MTE Tags" />
              <StatBox label="Security" value="Root / Realm" />
            </div>
          </Card>

          <Card title="References" headerClass="ch-navy" grow>
            <div className="refs" style={{ fontSize: '10px', lineHeight: 1.7 }}>
              Arm Ltd., "Armv9-A Architecture Reference Manual (ARM)," Ed. 2024.1.<br />
              Arm Ltd., "ARMv9.2-A Instruction Set Architecture Supplement (A64)," 2024.<br />
              <a href="https://developer.arm.com/documentation/ddi0601" style={{ color: '#0040C1', textDecoration: 'none' }}>developer.arm.com/documentation/ddi0601</a><br />
              Arm Ltd., "Arm Architecture Reference Manual supplement: RME," 2023.<br />
              <a href="https://developer.arm.com/documentation/ddi0615" style={{ color: '#0040C1', textDecoration: 'none' }}>developer.arm.com/documentation/ddi0615</a><br />
              IEEE Micro, "A Profile of the Armv9.2 Architecture," vol. 43, no. 2, 2023.<br />
              <a href="https://ieeexplore.ieee.org" style={{ color: '#0040C1', textDecoration: 'none' }}>ieeexplore.ieee.org</a><br />
              Arm Ltd., "Armv9-A Performance Monitoring Unit (PMU) Guide," 2023.<br />
              <a href="https://developer.arm.com/documentation/102374" style={{ color: '#0040C1', textDecoration: 'none' }}>developer.arm.com/documentation/102374</a><br />
            </div>
          </Card>
          <TeamTable />
        </div>
      </div>
    </div>
  )
}

function StatBox({ label, value }) {
  return (
    <div className="st">
      <div className="sk">{label}</div>
      <div className="sv">{value}</div>
    </div>
  )
}

function CoaArchitecture() {
  const width = 320;
  const centerX = width / 2;

  return (
    <svg viewBox="0 0 320 440" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ fontFamily: "'JetBrains Mono',monospace", border: '1px solid #D0DBF0', borderRadius: '4px', display: 'block', marginBottom: '5px', background: '#fff' }}>
      <defs>
        <marker id="ab" markerWidth="5" markerHeight="4" refX="4" refY="2" orient="auto">
          <path d="M0,0 L5,2 L0,4 Z" fill="#334155" />
        </marker>
        <marker id="ab-green" markerWidth="5" markerHeight="4" refX="4" refY="2" orient="auto">
          <path d="M0,0 L5,2 L0,4 Z" fill="#006B63" />
        </marker>
      </defs>

      {/* Background Frame */}
      <rect x="2" y="2" width="316" height="436" rx="4" fill="none" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3,2" />
      <text x={centerX} y="15" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">ARMv9.2-A ARCHITECTURAL DOMAIN</text>

      {/* APPLICATION CORES */}
      <g transform="translate(50, 24)">
        <rect x="0" y="0" width="220" height="38" rx="3" fill="#EFF6FF" stroke="#0040C1" strokeWidth="1.5" />
        <text x="110" y="16" textAnchor="middle" fill="#0040C1" fontSize="9.5" fontWeight="900">APPLICATION CORE</text>
        <text x="110" y="29" textAnchor="middle" fill="#475569" fontSize="7.2" fontWeight="700">AArch64 · EL0–EL3 · Non-Secure / Secure / Realm</text>
      </g>

      <g transform="translate(50, 68)">
        <rect x="0" y="0" width="220" height="38" rx="3" fill="#EFF6FF" stroke="#0040C1" strokeWidth="1.5" />
        <text x="110" y="16" textAnchor="middle" fill="#0040C1" fontSize="9.5" fontWeight="900">APPLICATION CORE</text>
        <text x="110" y="29" textAnchor="middle" fill="#475569" fontSize="7.2" fontWeight="700">AArch64 · EL0–EL3 · Non-Secure / Secure / Realm</text>
      </g>

      {/* SHARED CLUSTER LOGIC (DSU) */}
      <g transform="translate(60, 115)">
        <rect x="0" y="0" width="200" height="24" rx="3" fill="#f8fafc" stroke="#1A365D" strokeWidth="1.5" />
        <text x="100" y="15" textAnchor="middle" fill="#1A365D" fontSize="9" fontWeight="900">SHARED CLUSTER LOGIC (DSU)</text>
      </g>

      <line x1={centerX} y1="62" x2={centerX} y2="68" stroke="#334155" strokeWidth="1" />
      <line x1={centerX} y1="106" x2={centerX} y2="115" stroke="#334155" strokeWidth="1" />

      {/* COHERENT INTERCONNECT */}
      <g transform="translate(35, 148)">
        <rect x="0" y="0" width="250" height="40" rx="3" fill="#fafafa" stroke="#001A4F" strokeWidth="2.5" />
        <text x="125" y="18" textAnchor="middle" fill="#001A4F" fontSize="9.5" fontWeight="900">COHERENT INTERCONNECT (AMBA CHI / ACE)</text>
        <text x="125" y="31" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="700">Snoop Control · Hardware Coherency</text>
      </g>

      <line x1={centerX} y1="139" x2={centerX} y2="148" stroke="#001A4F" strokeWidth="1.2" />

      {/* RME */}
      <g transform="translate(50, 198)">
        <rect x="0" y="0" width="220" height="48" rx="3" fill="#f0fdf4" stroke="#006B63" strokeWidth="1.5" />
        <text x="110" y="15" textAnchor="middle" fill="#006B63" fontSize="9.5" fontWeight="900">REALM MANAGEMENT EXTENSION (RME)</text>
        <text x="110" y="28" textAnchor="middle" fill="#166534" fontSize="7.5" fontWeight="700">ROOT · REALM · SECURE · NON-SECURE</text>
        <text x="110" y="40" textAnchor="middle" fill="#065f46" fontSize="7.5" fontWeight="500">Confidential Compute Architecture</text>
      </g>

      <line x1={centerX} y1="188" x2={centerX} y2="198" stroke="#006B63" strokeWidth="1.2" markerEnd="url(#ab-green)" />

      {/* SYSTEM MMU */}
      <g transform="translate(50, 256)">
        <rect x="0" y="0" width="220" height="38" rx="3" fill="#f8fafc" stroke="#1A365D" strokeWidth="1.5" />
        <text x="110" y="15" textAnchor="middle" fill="#1A365D" fontSize="9.5" fontWeight="900">SYSTEM MMU / VIRTUALIZATION</text>
        <text x="110" y="29" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="700">STAGE-2 TRANSLATION (VMSAv8-64)</text>
      </g>

      <line x1={centerX} y1="246" x2={centerX} y2="256" stroke="#1A365D" strokeWidth="1.2" />

      {/* MAIN MEMORY */}
      <g transform="translate(50, 304)">
        <rect x="0" y="0" width="220" height="38" rx="3" fill="#f8fafc" stroke="#64748B" strokeWidth="1.5" />
        <text x="110" y="15" textAnchor="middle" fill="#475569" fontSize="9.5" fontWeight="900">MAIN MEMORY / SYSTEM</text>
        <text x="110" y="29" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="700">Up to 52-bit Physical Address (PA)</text>
      </g>

      <line x1={centerX} y1="294" x2={centerX} y2="304" stroke="#64748B" strokeWidth="1.2" />

      {/* DEBUG */}
      <g transform="translate(35, 352)">
        <rect x="0" y="0" width="250" height="42" rx="3" fill="#fff7ed" stroke="#b45309" strokeWidth="1.5" />
        <text x="125" y="18" textAnchor="middle" fill="#b45309" fontSize="9.5" fontWeight="900">PMU · DEBUG & TRACE ARCHITECTURE</text>
        <text x="125" y="32" textAnchor="middle" fill="#9a3412" fontSize="7.5" fontWeight="700">Architectural Performance Monitoring & CoreSight</text>
      </g>

      <line x1={centerX} y1="342" x2={centerX} y2="352" stroke="#b45309" strokeWidth="1.2" />
    </svg>
  );
}

function CoaRegisters() {
  const width = 320;
  const centerX = width / 2;

  return (
    <svg viewBox="0 0 320 100" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ fontFamily: "'JetBrains Mono',monospace", border: '1px solid #D0DBF0', borderRadius: '4px', display: 'block', marginBottom: '5px', background: '#fff' }}>
      {/* Label for 64-bit register */}
      <text x={centerX} y="15" textAnchor="middle" fill="#001A4F" fontSize="9" fontWeight="900">64-BIT Xn REGISTER (AArch64)</text>

      {/* 64-bit Register Box */}
      <rect x="15" y="22" width="290" height="20" rx="2" fill="#EFF6FF" stroke="#0040C1" strokeWidth="1.5" />

      <line x1={centerX} y1="22" x2={centerX} y2="42" stroke="#0040C1" strokeWidth="1" strokeDasharray="3,2" />

      <text x="88" y="35" textAnchor="middle" fill="#1e3a8a" fontSize="8.5" fontWeight="800">[63 : 32]</text>
      <text x="232" y="35" textAnchor="middle" fill="#1e3a8a" fontSize="8.5" fontWeight="800">[31 : 0]</text>

      {/* Label for 32-bit alias */}
      <text x={centerX} y="58" textAnchor="middle" fill="#1A365D" fontSize="9" fontWeight="900">32-BIT Wn ALIAS (Lower Half)</text>

      <rect x="90" y="64" width="140" height="16" rx="2" fill="#f0fdfa" stroke="#006B63" strokeWidth="1.5" />
      <text x={centerX} y="75" textAnchor="middle" fill="#006B63" fontSize="8" fontWeight="800">[31 : 0]</text>

      <br />
      <text x={centerX} y="92" textAnchor="middle" fill="#0040C1" fontSize="6.5" fontWeight="700" fontStyle="italic">* WRITES TO Wn ZERO-EXTEND TO THE FULL 64-BIT Xn REGISTER</text>
    </svg>
  )
}

import datapathImg from './assets/datapath_extracted.png';

function CoaDatapath() {
  return (
    <div style={{ background: '#fff', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img
        src={datapathImg}
        alt="AArch64 Instruction Datapath"
        style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );
}

function RegisterTable() {
  return (
    <table className="rt">
      <thead>
        <tr>
          <th>Register</th>
          <th>Alias</th>
          <th>Purpose</th>
        </tr>
      </thead>
      <br />
      <tbody>
        {[
          ["X0 – X7", "W0–W7", "Function arguments & return values"],
          ["X8 – X18", "W8–W18", "Caller-saved temporaries (X16/X17 = IP0/IP1)"],
          ["X19 – X28", "W19–W28", "Callee-saved (preserved across calls)"],
          ["X29 / X30", "FP / LR", "Frame Pointer / Link Register"],
          ["V0 – V31", "Q/D/S/H/B views", "SIMD & FP (128-bit registers)"],
          ["Z0 – Z31", "–", "SVE2 scalable vectors (128–2048 bits, implementation-defined)"],
          ["ZA Tile", "—", "SME matrix accumulator array"]
        ].map(([reg, alias, purpose], idx) => (
          <tr key={idx} >
            <td className="rn">{reg}</td>
            <td>{alias}</td>
            <td>{purpose}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
function InstructionTypeTable() {
  return (
    <table className="rt">
      <thead>
        <tr>
          <th>Category</th>
          <th>Instruction Example</th>
          <th>Operation</th>
        </tr>
      </thead>
      <tbody>
        {[
          ["Integer", "ADD X0, X1, X2", "X0 = X1 + X2"],
          ["Logical", "AND W3, W4, #0xFF", "Bitwise AND using logical immediate mask"],
          ["Shift", "LSR X5, X6, #2", "Logical right shift (÷4)"],
          ["Move", "MOV X7, #42", "Load immediate constant into register (alias of MOVZ/MOVN)"],
          ["Load", "LDR X8, [X9]", "64-bit load from memory address"],
          ["Store", "STR W10, [SP, #4]", "32-bit store to stack with immediate offset"],
          ["Branch", "CBZ W2, label", "Compare and branch if register equals zero"],
          ["SIMD / FP", "FADD S0, S1, S2", "FP scalar addition"],
          ["SVE2", "ADD Z0.S, Z1.S, Z2.S", "Scalable vector integer add"],
          ["System", "MRS X0, CTR_EL0", "Read system register to GPR"]
        ].map(([cat, ex, op], idx) => (
          <tr key={idx}>
            <td className="rn">{cat}</td>
            <td>{ex}</td>
            <td>{op}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ISAClarification() {
  return (
    <div className="isa-info-grid">
      <div className="isa-info-box">
        <div className="isa-info-title">Immediate & Offset Ranges</div>
        <div className="isa-info-content">
          <ul>
            <li>Arithmetic: 12-bit (opt. shifted)</li>
            <li>Load/Store: Scaled by access size</li>
            <li>Branch: PC-relative offsets</li>
          </ul>
        </div>
      </div>

      <div className="isa-info-box">
        <div className="isa-info-title">Condition Flags (NZCV)</div>
        <div className="isa-info-content">
          <div className="nzcv-tag-grid">
            <div className="nzcv-tag"><strong>N</strong> Neg</div>
            <div className="nzcv-tag"><strong>Z</strong> Zero</div>
            <div className="nzcv-tag"><strong>C</strong> Carry</div>
            <div className="nzcv-tag"><strong>V</strong> Oflw</div>
          </div>
          <p style={{ fontSize: '8.5px', marginTop: '2px', color: '#64748b' }}>Used by CMP & Conditional Branches</p>
        </div>
      </div>

      <div className="isa-info-box">
        <div className="isa-info-title">Load/Store ISA Model</div>
        <div className="isa-info-content">
          <p style={{ fontSize: '9.2px', lineHeight: 1.25 }}>
            Memory is accessed <b>only</b> via load/store instructions. ALU instructions operate on <b>registers only</b>.
          </p>
        </div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div className="footer">
      <p>ARMv9.2-A ARCHITECTURE · <span>COA CAPSTONE POSTER</span></p>
      <div className="arm-logo" style={{ fontSize: '18px', opacity: 0.8, letterSpacing: '2px' }}>ARM v9.2-A</div>
      <p>B.TECH CSE 2024–28 · <span>SEMESTER 4 · 23CSE213</span></p>
    </div>
  )
}

function TeamTable() {
  return (
    <div className="team-card">
      <div className="team-hdr-y">B.Tech CSE 2024–28 Batch · Semester 4</div>
      <div className="team-hdr-w">23CSE213 — Computer Organization and Architecture</div>
      <table className="team-tbl">
        <thead>
          <tr>
            <th style={{ width: '48%' }}>Roll Number</th>
            <th>Student Name</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>CB.SC.U4CSE24240</td><td>P SANJAY</td></tr>
          <tr><td>CB.SC.U4CSE24241</td><td>P BHAVITH MADHU</td></tr>
          <tr><td>CB.SC.U4CSE24243</td><td>RAGHAV VS</td></tr>
          <tr><td>CB.SC.U4CSE24244</td><td>R VIKRANTH</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default App
