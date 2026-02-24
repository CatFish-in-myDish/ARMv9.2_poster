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
        <div className="sp"><strong>Security:</strong> Root · Realm · Secure · Non-Secure (RME)</div>
        <div className="sp"><strong>Memory:</strong> VMSAv8-64 · Stage 1 & 2 Translation · 52-bit PA</div>
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
      <div className="sb-item"><span className="sbd" style={{ background: '#00B4DB' }}></span><strong>ISA:</strong> 64-bit Fixed-width · AArch64 execution state</div>
      <div className="sb-item"><span className="sbd" style={{ background: '#4ade80' }}></span><strong>Registers:</strong> 31× 64-bit GPR + SP + PC + V/Z/ZA</div>
      <div className="sb-item"><span className="sbd" style={{ background: '#f59e0b' }}></span><strong>Translation:</strong> MMU with Stage 1 & Stage 2 Support</div>
      <div className="sb-item"><span className="sbd" style={{ background: '#a78bfa' }}></span><strong>Security:</strong> 4 States — Root · Realm · Secure · Non-Secure</div>
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
          <div className="ac-chip" style={{ padding: '2px' }}>Reg Extend<br />[Xn, Wm, SXTW]</div>
        </div>
        <div className="ac-grid" style={{ gridTemplateColumns: '1fr 1.2fr', gap: '2px', marginTop: '2px' }}>
          <div className="ac-chip" style={{ padding: '2px' }}>PC-Relative Load<br />LDR Xt, label</div>
          <div className="ac-chip" style={{ padding: '2px' }}>Pair Addressing<br />LDP / STP [Xn, #imm]</div>
        </div>
        <br />
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
              ["Realm Mgmt Extension (RME)", "Architectural isolation: Root, Realm, Secure, Non-Secure states. Protects data by moving trust from OS/Hypervisor to hardware."],
              ["SME — Scalable Matrix Ext.", "Introduces 2D ZA tile register file and outer-product instructions for architectural matrix acceleration."],
              ["SVE2 — Scalable Vector Ext. v2", "Variable-length SIMD (128–2048 bits) with per-lane predication and hardware-managed vector length agnostic (VLA) coding."],
              ["Memory Tagging Ext. (MTE)", "Hardware-assisted memory safety: tags on pointers and memory granules to detect use-after-free and buffer overflows."],
              ["Pointer Authentication (PAC)", "Cryptographic signatures (PACs) on pointers to detect and prevent unauthorized pointer modifications (ROP/JOP mitigation)."],
              ["Branch Target ID (BTI)", "Enforces that indirect branches must target specifically marked instructions, limiting gadget-based binary exploitation."],
              ["Guarded Control Stack (GCS)", "Hardware-enforced stack for return addresses to mitigate ROP-style attacks (Return-Oriented Programming)."]
            ].map(([title, desc], idx) => (
              <div className="fi" key={idx}>
                <div className="fi-t"><strong>{title}</strong><span>{desc}</span></div>
              </div>
            ))}
          </Card>
        </div>

        <div className="col">
          <Card title="Standard Architectural Pipeline Stages" headerClass="ch-blue">
            <div className="pipe-wrap" style={{ margin: '3px 0' }}>
              <div className="pipe-box pb1">IF<span className="pipe-sub">Instruction<br />Fetch</span></div>
              <div className="pipe-box pb2">ID<span className="pipe-sub">Instruction<br />Decode</span></div>
              <div className="pipe-box pb3">EX<span className="pipe-sub">ALU / FPU / SIMD<br />Execute</span></div>
              <div className="pipe-box pb4">MEM<span className="pipe-sub">Memory<br />Access</span></div>
              <div className="pipe-box pb5">WB<span className="pipe-sub">Register<br />Writeback</span></div>
              <div className="pipe-box pb6">CMT<span className="pipe-sub">Architectural<br />Commit</span></div>
            </div>
            <p style={{ fontSize: '11px', color: '#475569', margin: '2px 0 2px' }}><strong>Logical Flow:</strong> The ARMv9.2-A architecture defines a sequential machine model. Implementation artifacts like Out-of-Order execution and Renaming are supported but remain transparent to the programmer at the architectural level.</p>
            <div className="sg3">
              <StatBox label="Vector Support" value="SVE2 / SME" />
              <StatBox label="Memory Safety" value="MTE Tags" />
              <StatBox label="Security" value="Root / Realm" />
            </div>
          </Card>

          <Card title="References" headerClass="ch-navy" grow>
            <div className="refs" style={{ fontSize: '10px', lineHeight: 1.7 }}>
              Arm Ltd., "Armv9-A Architecture Reference Manual (ARM)," Ed. 2024.1.<br />
              <a href="https://developer.arm.com/documentation/ddi0601" style={{ color: '#0040C1', textDecoration: 'none' }}>developer.arm.com/documentation/ddi0601</a><br />
              Arm Ltd., "Arm Architecture Reference Manual supplement: RME," 2023.<br />
              <a href="https://developer.arm.com/documentation/ddi0615" style={{ color: '#0040C1', textDecoration: 'none' }}>developer.arm.com/documentation/ddi0615</a><br />
              IEEE Micro, "A Profile of the Armv9.2 Architecture," vol. 43, no. 2, 2023.<br />
              <a href="https://ieeexplore.ieee.org" style={{ color: '#0040C1', textDecoration: 'none' }}>ieeexplore.ieee.org</a><br />
              Arm Ltd., "Armv9-A Performance Monitoring Unit (PMU) Guide," 2023.<br />
              {/* <a href="https://developer.arm.com/documentation" style={{ color: '#0040C1', textDecoration: 'none' }}>developer.arm.com/documentation</a><br />
              Arm Developer, "Learn the Architecture: SME & SVE2 Overview," 2023.<br />
              <a href="https://developer.arm.com/architectures/instruction-sets" style={{ color: '#0040C1', textDecoration: 'none' }}>developer.arm.com/architectures/instruction-sets</a> */}
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

function CoaDatapath() {
  return (
    <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
      <svg viewBox="0 0 960 660" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ fontFamily: "'Inter', sans-serif" }}>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#1e293b" />
          </marker>
          <marker id="control-arrow" markerWidth="8" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <polygon points="0 0, 8 2.5, 0 5" fill="#ef4444" />
          </marker>
        </defs>

        {/* --- TIERED TITLE --- */}
        <text x="480" y="30" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">AArch64 Instruction Datapath Cleanup</text>
        <text x="480" y="55" textAnchor="middle" fill="#64748b" fontSize="11" fontStyleStyle="italic">“Refined Textbook Model for Single-Cycle Architectural Study”</text>

        {/* --- HARDWARE TIER: UPPER (FETCH & BRANCH) --- */}

        {/* Next PC Mux Cluster */}
        <path d="M40 270 L70 278 L70 342 L40 350 Z" fill="#fff" stroke="#64748b" strokeWidth="2" />
        <text x="55" y="265" textAnchor="middle" fill="none" stroke="#fff" strokeWidth="4" fontSize="10" fontWeight="900">MUX</text>
        <text x="55" y="265" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="900">MUX</text>

        {/* PC Register */}
        <rect x="100" y="280" width="55" height="100" fill="#eff6ff" stroke="#2563eb" strokeWidth="2.5" />
        <text x="127.5" y="335" textAnchor="middle" fill="#1e40af" fontSize="13" fontWeight="950">PC</text>

        {/* PC+4 Incrementer */}
        <path d="M170 140 L205 105 L205 175 Z" fill="#f8fafc" stroke="#64748b" strokeWidth="2" transform="rotate(-90 187.5 140)" />
        <text x="187.5" y="125" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="950">Add</text>
        <text x="160" y="155" fill="#475569" fontSize="12" fontWeight="800">4</text>

        {/* Branch Target Adder */}
        <path d="M480 80 L515 45 L515 115 Z" fill="#fcfcfc" stroke="#64748b" strokeWidth="2" transform="rotate(-90 497.5 80)" />
        <text x="497.5" y="65" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="950">Add</text>

        {/* Branch Logic Cluster (Isolated Far Right) */}
        <path d="M840 130 L840 170 A 20 20 0 0 0 880 150 A 20 20 0 0 0 840 130" fill="#f8fafc" stroke="#1e293b" strokeWidth="2" />
        <text x="858" y="120" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="1000">AND</text>

        {/* --- HARDWARE TIER: MIDDLE (EXECUTION) --- */}

        {/* Instruction Memory */}
        <rect x="220" y="270" width="110" height="120" fill="#eff6ff" stroke="#2563eb" strokeWidth="2.5" />
        <text x="275" y="325" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="950">Instruction</text>
        <text x="275" y="343" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="950">Memory</text>

        {/* Register File */}
        <rect x="500" y="250" width="130" height="160" fill="#faf5ff" stroke="#7e22ce" strokeWidth="3" />
        <text x="565" y="275" textAnchor="middle" fill="#6b21a8" fontSize="13" fontWeight="1000">Register File</text>

        {/* ALU (Primary Focus) */}
        <path d="M750 270 L750 325 L770 340 L750 355 L750 410 L825 365 L825 315 Z" fill="#f8fafc" stroke="#1e293b" strokeWidth="3" />
        <text x="787" y="345" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="1000">ALU</text>

        {/* Data Memory */}
        <rect x="855" y="270" width="100" height="120" fill="#eff6ff" stroke="#2563eb" strokeWidth="2.5" />
        <text x="905" y="325" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="950">Data Memory</text>

        {/* --- HARDWARE TIER: LOWER (DECODE & CONTROL) --- */}

        {/* Control Unit (Hub Positioning) */}
        <path d="M370 160 L430 100 L490 160 L430 220 Z" fill="#fef2f2" stroke="#ef4444" strokeWidth="3" />
        <text x="430" y="165" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="1000">Control Unit</text>

        {/* Immediate Decode */}
        <rect x="360" y="470" width="135" height="55" rx="15" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2.5" />
        <text x="427.5" y="495" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="1000">Immediate Decode /</text>
        <text x="427.5" y="512" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="1000">Sign Extension</text>

        {/* ALU Control */}
        <path d="M650 520 L700 470 L750 520 L700 570 Z" fill="#fefce8" stroke="#ca8a04" strokeWidth="2.5" />
        <text x="700" y="515" textAnchor="middle" fill="#854d0e" fontSize="11" fontWeight="1000">ALU</text>
        <text x="700" y="532" textAnchor="middle" fill="#854d0e" fontSize="11" fontWeight="1000">Control</text>

        {/* ALU/WB Muxes */}
        <path d="M685 330 L710 335 L710 395 L685 400 Z" fill="#fff" stroke="#64748b" strokeWidth="2" />
        <text x="697" y="325" textAnchor="middle" fill="#475569" fontSize="9" fontWeight="900">MUX</text>

        <path d="M850 480 L880 485 L880 545 L850 550 Z" fill="#fff" stroke="#64748b" strokeWidth="2" transform="rotate(-90 865 515)" />
        <text x="865" y="475" textAnchor="middle" fill="#475569" fontSize="9" fontWeight="900">MUX</text>

        {/* --- SIGNAL ROUTING: DATA PATH TIERED LANES (THICK BLACK) --- */}
        <g fill="none" stroke="#1e293b" strokeWidth="2.8" markerEnd="url(#arrowhead)">
          {/* Lane 1: Fetch */}
          <path d="M70 310 L100 310" />
          <path d="M155 330 L220 330" />
          <path d="M165 330 V140 H170" markerEnd="none" />
          <path d="M205 140 H30 V290 H40" />
          <path d="M220 140 V75 H480" />

          {/* Lane 2: Execute */}
          <path d="M330 330 L500 330" />
          <path d="M350 330 V160 H370" />
          <path d="M350 330 V497 H360" />
          <path d="M350 330 V580 H680 V550" />
          <path d="M495 497 H670 V380 H685" />
          <path d="M540 497 V85" markerEnd="url(#arrowhead)" strokeDasharray="6,4" /> {/* Branch offset */}
          <path d="M512 80 H910 V15 H10 V325 H40" /> {/* Branch Target to PC Mux */}

          <path d="M630 300 H750" />
          <path d="M630 370 H685" />
          <path d="M710 370 H750" />
          <path d="M825 340 H855" />
          <path d="M835 340 V528 H845" markerEnd="none" />
          <path d="M955 330 H960 V515 H895" />
          <path d="M835 515 H15 V640 H565 V410" /> {/* Final Write Back */}
        </g>

        {/* --- SIGNAL ROUTING: CONTROL TIERED LANES (THIN RED) --- */}
        <g fill="none" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#control-arrow)">
          <path d="M430 220 V250 H790 V145 H840" /> {/* Branch logic trigger */}
          <path d="M490 145 H550 V250" />           {/* RegWrite enable */}
          <path d="M455 220 V255 H697 V330" />       {/* ALUSrc select */}
          <path d="M405 220 V610 H670 V555" />       {/* ALUOp distribution */}
          <path d="M475 220 V245 H905 V270" />       {/* Data Memory R/W */}
          <path d="M490 180 H935 V515 H880" />       {/* MemToReg mux select */}
          <path d="M700 470 V420" stroke="#ca8a04" markerEnd="url(#control-arrow)" /> {/* ALU Command cable */}
        </g>

        {/* Status Line (Blue) */}
        <path d="M787 410 V440 H820 V165 H840" fill="none" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

        {/* Next PC Select Feed */}
        <path d="M880 150 H920 V10 H5 V275 H40" fill="none" stroke="#1e293b" strokeWidth="1.2" markerEnd="url(#arrowhead)" />

        {/* --- ANNOTATIONS & LABELS (ZERO OVERLAP) --- */}
        <g fontSize="10" fontWeight="950" textAnchor="start">
          <text x="560" y="242" fill="#ef4444">RegWrite</text>
          <text x="350" y="242" fill="#ef4444">Branch</text>
          <text x="590" y="625" fill="#ef4444">ALUOp Code</text>
          <text x="795" y="455" fill="#3b82f6">Zero Flag</text>
          <text x="55" y="210" fill="#1e293b" transform="rotate(-90 55 210)">PCSrc Logic</text>
          <text x="860" y="240" fill="#ef4444">Mem Control</text>
          <text x="340" y="280" fill="#3b82f6" fontWeight="900" fontSize="10">[31-21]</text>
          <text x="340" y="395" fill="#3b82f6" fontWeight="900" fontSize="10">[25-0]</text>
        </g>

        {/* LEGEND (Bottom Right Clean Zone) */}
        <g transform="translate(685, 545)">
          <rect width="265" height="105" fill="#fff" stroke="#e2e8f0" rx="8" />
          <text x="12" y="22" fontSize="12" fontWeight="1000" fill="#0f172a">AARCH64 ROUTING LEGEND</text>
          <line x1="12" y1="42" x2="52" y2="42" stroke="#1e293b" strokeWidth="4" />
          <text x="60" y="47" fontSize="10" fill="#475569" fontWeight="800">64-bit Core Buses (Banded Lanes)</text>
          <line x1="12" y1="65" x2="52" y2="65" stroke="#ef4444" strokeWidth="2" />
          <text x="60" y="70" fontSize="10" fill="#991b1b" fontWeight="800">Control Signal Plane (Tier 3)</text>
          <line x1="12" y1="88" x2="52" y2="88" stroke="#3b82f6" strokeWidth="2" />
          <text x="60" y="93" fontSize="10" fill="#1e40af" fontWeight="800">Execution Status / Flags</text>
        </g>

      </svg>
    </div>
  )
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
          ["X8 – X18", "W8–W18", "Caller-saved; X8=XR, X16/X17=IP0/IP1"],
          ["X19 – X28", "W19–W28", "Callee-saved (preserved across calls)"],
          ["X29 / X30", "FP / LR", "Frame Pointer / Link Register"],
          ["V0 – V31", "Q/D/S/H/B", "SIMD & FP — 128-bit vector banks"],
          ["Z0 – Z31", "—", "SVE2 scalable vectors (128–2048b, impl-defined)"],
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
          ["Logical", "AND W3, W4, #0xFF", "Bitwise AND with immediate mask"],
          ["Shift", "LSR X5, X6, #2", "Logical right shift (÷4)"],
          ["Move", "MOV X7, #42", "Load immediate constant to register"],
          ["Load", "LDR X8, [X9]", "64-bit load from memory address"],
          ["Store", "STR W10, [SP, #4]", "32-bit store to stack + 4 offset"],
          ["Branch", "CBZ W2, label", "Branch if W2 == 0"],
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
        <div className="isa-info-title">Load/Store Architecture</div>
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
      <p><span>①</span> Architecture · Registers · ISA (Types · Formats · Addressing) &nbsp;|&nbsp; <span>②</span> Datapath · Pipeline · Features · References &nbsp;|&nbsp; <span>④</span> Comparison & Critical Thinking</p>
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
