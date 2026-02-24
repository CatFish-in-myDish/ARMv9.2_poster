import './App.css'

function App() {
  return (
    <div className="poster">
      <Header />
      <Subbar />
      <div className="body">
        <Column1 />
        <Column2 />
        <Column3 />
        <Column4 />
      </div>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <div className="hdr">
      <div className="hdr-left">
        <h1><em>ARM</em>v9.2-A Architecture <span style={{ fontSize: '24px', color: '#00B4DB', fontWeight: '600' }}>(AArch64)</span></h1>
        <div className="sub">23CSE213 · Computer Organization & Architecture · B.Tech CSE 2024–28 · Semester 4</div>
      </div>
      <div className="hdr-specs">
        <div className="sp"><strong>Arch:</strong> AArch64 · A64 ISA · Fixed 32-bit instructions · RISC</div>
        <div className="sp"><strong>Features:</strong> RME · SME2 · SVE2 · MTE · PAC · BTI · TME · BRBE</div>
        <div className="sp"><strong>Execution:</strong> EL0 (User) · EL1 (OS) · EL2 (Hyp) · EL3 (Secure)</div>
        <div className="sp"><strong>Memory Model:</strong> Weakly ordered · Acquire-release semantics</div>
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
      <div className="sb-item"><span className="sbd" style={{ background: '#00B4DB' }}></span><strong>ISA:</strong> 32-bit fixed-width · AArch64 only</div>
      <div className="sb-item"><span className="sbd" style={{ background: '#4ade80' }}></span><strong>Registers:</strong> 31× 64-bit GPR + SP + PC + V/Z/ZA</div>
      <div className="sb-item"><span className="sbd" style={{ background: '#f59e0b' }}></span><strong>Pipeline:</strong> Out-of-Order · 8-wide Fetch/Decode/Dispatch</div>
      <div className="sb-item"><span className="sbd" style={{ background: '#a78bfa' }}></span><strong>Security:</strong> 4 States — Root · Realm · Secure · Non-Secure</div>
      <div className="sb-item"><span className="sbd" style={{ background: '#fb923c' }}></span><strong>Cache:</strong> L1 64KB I+D · L2 512KB–2MB private · DSU-120 L3</div>
    </div>
  )
}

function SectionStripe({ num, title, mark }) {
  return (
    <div className="sec-stripe">
      <span className="sec-num">{num}</span>
      <span className="sec-title">{title}</span>
      <span className="sec-mark">{mark}</span>
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
      <SectionStripe num="①" title="Architecture, Registers & ISA" mark="4 Marks" />
      <Card title="1.1 · Architecture Overview" headerClass="ch-blue">
        <div className="hl">
          <strong>ARMv9.2-A</strong> is a 64-bit RISC architecture (AArch64) featuring
          <strong> RME</strong> for confidential compute, <strong>SME2</strong> for AI/ML, and
          <strong> SVE2</strong> for scalable vectorisation across mobile, server, and HPC domains.
        </div>
        <CoaArchitecture />
        <div className="sg">
          <StatBox label="Fetch / Decode" value="8-Wide OOO" />
          <StatBox label="ROB Capacity" value="384 Entries" />
          <StatBox label="L1 Cache" value="64KB I + 64KB D" />
          <StatBox label="Address Space" value="48 / 52-bit PA" />
        </div>
      </Card>
      <Card title="1.2 · Register Structure (AArch64)" headerClass="ch-cyan" grow>
        <CoaRegisters />
        <RegisterTable />
      </Card>
    </div>
  )
}

function Column2() {
  return (
    <div className="col">
      <SectionStripe num="①" title="ISA Types · Formats · Addressing" mark="4 Marks" />
      <Card title="1.3 · ISA Instruction Types (A64)" headerClass="ch-navy">
        <InstructionTypeTable />
      </Card>
      <Card title="1.4 · Instruction Formats (Fixed 32-bit)" headerClass="ch-blue">
        <p style={{ fontSize: '6.2px', color: '#334155', marginBottom: '5px' }}>
          Every AArch64 instruction is exactly <strong>32 bits wide</strong>. Field widths differ by format type:
        </p>
        <h4 style={{ display: 'flex', alignItems: 'center' }}>R-Type — Register–Register &nbsp;<span style={{ fontWeight: 400, color: '#64748B' }}>(ADD, SUB, AND, ORR…)</span></h4>
        <div className="fmt-row">
          <div className="fmt-seg fs-op" style={{ flex: 11 }}>Opcode<br />11b</div>
          <div className="fmt-seg fs-rm" style={{ flex: 5 }}>Rm<br />5b</div>
          <div className="fmt-seg fs-sh" style={{ flex: 6 }}>Shift<br />6b</div>
          <div className="fmt-seg fs-rn" style={{ flex: 5 }}>Rn<br />5b</div>
          <div className="fmt-seg fs-rd" style={{ flex: 5 }}>Rd<br />5b</div>
        </div>
        <h4>I-Type — Immediate &nbsp;<span style={{ fontWeight: 400, color: '#64748B' }}>(ADDI, SUBI, MOVZ, MOVK…)</span></h4>
        <div className="fmt-row">
          <div className="fmt-seg fs-op" style={{ flex: 10 }}>Opcode<br />10b</div>
          <div className="fmt-seg fs-im" style={{ flex: 12 }}>Immediate<br />12b</div>
          <div className="fmt-seg fs-rn" style={{ flex: 5 }}>Rn<br />5b</div>
          <div className="fmt-seg fs-rd" style={{ flex: 5 }}>Rd<br />5b</div>
        </div>
        <h4>D-Type — Load / Store &nbsp;<span style={{ fontWeight: 400, color: '#64748B' }}>(LDR, STR, LDUR, STUR…)</span></h4>
        <div className="fmt-row">
          <div className="fmt-seg fs-op" style={{ flex: 11 }}>Opcode<br />11b</div>
          <div className="fmt-seg fs-of" style={{ flex: 9 }}>Offset<br />9b</div>
          <div className="fmt-seg fs-op2" style={{ flex: 2 }}>Op<br />2b</div>
          <div className="fmt-seg fs-rn" style={{ flex: 5 }}>Rn<br />5b</div>
          <div className="fmt-seg fs-rd" style={{ flex: 5 }}>Rt<br />5b</div>
        </div>
        <h4>B-Type — Branch &nbsp;<span style={{ fontWeight: 400, color: '#64748B' }}>(B, BL, B.cond, BLR…)</span></h4>
        <div className="fmt-row">
          <div className="fmt-seg fs-op" style={{ flex: 6 }}>Opcode<br />6b</div>
          <div className="fmt-seg fs-of" style={{ flex: 26 }}>PC-Relative Offset &nbsp;·&nbsp; 26 bits</div>
        </div>
      </Card>
      <Card title="1.5 · Addressing Modes (AArch64)" headerClass="ch-cyan" grow>
        <div className="ac-grid">
          <div className="ac-chip">Base Register<br />[Xn]</div>
          <div className="ac-chip">Immediate Offset<br />[Xn, #imm]</div>
          <div className="ac-chip">Register Offset<br />[Xn, Xm]</div>
          <div className="ac-chip">Scaled Reg Offset<br />[Xn, Xm, LSL #3]</div>
          <div className="ac-chip">Pre-Index<br />[Xn, #imm]!</div>
          <div className="ac-chip">Post-Index<br />[Xn], #imm</div>
        </div>
        <div className="ac-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="ac-chip">PC-Relative &nbsp;·&nbsp; ADRP provides ±4GB page-relative addressing range</div>
        </div>
        <p style={{ marginTop: '5px', fontSize: '6px', color: '#475569', lineHeight: 1.55 }}>
          <strong>Pre-index</strong> updates base <em>before</em> access. <strong>Post-index</strong> updates base <em>after</em> access. <strong>PC-relative</strong> (ADRP) is used for position-independent code and large symbol addressing.
        </p>
      </Card>
    </div>
  )
}

function Column3() {
  return (
    <div className="col">
      <SectionStripe num="②" title="Datapath · Pipeline · Features · References" mark="4 Marks" />
      <Card title="2.1 · Datapath Diagram & Flow (Cortex-X4 OOO)" headerClass="ch-dark">
        <CoaDatapath />
      </Card>
      <Card title="2.2 · Pipeline Stages (IF – ID – EX – MEM – WB)" headerClass="ch-blue">
        <div className="pipe-wrap">
          <div className="pipe-box pb1">IF<span className="pipe-sub">Instruction<br />Fetch</span></div>
          <div className="pipe-box pb2">ID<span className="pipe-sub">Decode &<br />Reg Read</span></div>
          <div className="pipe-box pb3">EX<span className="pipe-sub">ALU / FPU<br />Execute</span></div>
          <div className="pipe-box pb4">MEM<span className="pipe-sub">L1 Cache<br />Access</span></div>
          <div className="pipe-box pb5">WB<span className="pipe-sub">Write<br />Back</span></div>
          <div className="pipe-box pb6">CMT<span className="pipe-sub">In-Order<br />Retire</span></div>
        </div>
        <p style={{ fontSize: '6px', color: '#475569', margin: '4px 0 3px' }}><strong>OOO enhancements:</strong> Rename stage eliminates WAR/WAW hazards via register renaming → Issue Queue dispatches out-of-order → Reorder Buffer (ROB, 384 entries) enforces in-order retirement</p>
        <div className="sg3">
          <StatBox label="Fetch Width" value="8-wide" />
          <StatBox label="ROB Entries" value="384" />
          <StatBox label="Dispatch" value="8-wide" />
        </div>
      </Card>
      <Card title="④ · Comparison & Critical Thinking — ARMv9.2 vs ARMv8.x" headerClass="ch-grn" grow>
        <ComparisonTable />
        <p style={{ marginTop: '5px', fontSize: '5.8px', color: '#475569', fontStyle: 'italic', lineHeight: 1.5, padding: '4px 6px', background: '#f8fafc', borderRadius: '3px', borderLeft: '2px solid #0040C1' }}>
          <strong>Critical insight:</strong> ARMv9.2 is not an incremental update — it simultaneously redefines security (RME creates a new trust boundary), AI compute (SME2 adds native matrix hardware), and SIMD scalability (SVE2 eliminates width fragmentation). This makes a single ARMv9.2-A binary viable across mobile, cloud, HPC, and automotive domains — something ARMv8 could not achieve.
        </p>
      </Card>
    </div>
  )
}

function Column4() {
  return (
    <div className="col">
      <SectionStripe num="②④" title="Key Features & Critical Thinking" mark="4 + 4 Marks" />
      <Card title="2.3 · Key Processor Features" headerClass="ch-dark">
        {[
          ["Realm Mgmt Extension (RME)", "4 hardware security states: Root, Realm, Secure, Non-Secure. Isolates confidential workloads from host OS/hypervisor at hardware level."],
          ["SME2 — Scalable Matrix Ext.", "Introduces a 2D ZA tile register file optimized for matrix multiplication and outer-product operations."],
          ["SVE2 — Scalable Vector Ext. v2", "Variable-length SIMD (128–2048 bits, implementation-defined; Cortex-X4 implements 128-bit)."],
          ["Memory Tagging Ext. (MTE)", "Hardware memory safety — detects use-after-free & buffer overflows at runtime with near-zero performance overhead."],
          ["Pointer Authentication (PAC)", "Cryptographic signatures on return addresses & pointers. Prevents ROP & JOP binary exploitation attacks."],
          ["Branch Target ID (BTI)", "Hardware-enforced valid indirect branch targets — prevents Jump-Oriented Programming attacks in production code."],
          ["Transactional Memory (TME)", "Hardware atomic transactions — accelerates lock-intensive concurrent & multi-threaded workloads."],
          ["Branch Record Buffer (BRBE)", "Captures branch history in hardware for precise profiling, performance analysis & compiler optimization."]
        ].map(([title, desc], idx) => (
          <div className="fi" key={idx}>
            <div className="fi-num">{idx + 1}</div>
            <div className="fi-t"><strong>{title}</strong><span>{desc}</span></div>
          </div>
        ))}
      </Card>
      <Card title="2.4 · Quality References" headerClass="ch-navy" grow>
        <div className="refs">
          <span>[1]</span> Arm Ltd., "Armv9-A Architecture Reference Manual," Ed. 2024.1.<br />
          <span>[2]</span> Arm Developer, "Realm Management Extension (RME) Overview," Arm Whitepaper, 2023.<br />
          <span>[3]</span> IEEE Micro, "A Profile of the Armv9.2 Architecture," vol. 43, no. 2, 2023.<br />
          <span>[4]</span> Arm Tech, "Cortex-X4 Pipeline & Microarchitecture Internals," Technical Guide, 2023.<br />
          <span>[5]</span> Arm Developer, "SME2 — Scalable Matrix Extension 2 Overview," 2023.
        </div>
      </Card>
      <TeamTable />
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
  return (
    <svg viewBox="0 0 295 178" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ fontFamily: "'JetBrains Mono',monospace", border: '1px solid #D0DBF0', borderRadius: '4px', display: 'block', marginBottom: '5px' }}>
      <defs>
        <marker id="ab" markerWidth="5" markerHeight="4" refX="4" refY="2" orient="auto">
          <path d="M0,0 L5,2 L0,4 Z" fill="#334155" />
        </marker>
      </defs>
      <rect x="2" y="2" width="291" height="174" rx="5" fill="none" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4,3" />
      <text x="7" y="11" fill="#94a3b8" fontSize="4.5" fontWeight="700">ARMv9.2-A SoC BOUNDARY</text>
      <rect x="8" y="16" width="74" height="22" rx="3" fill="#EFF6FF" stroke="#0040C1" strokeWidth="1.5" />
      <text x="45" y="25" textAnchor="middle" fill="#0040C1" fontSize="5" fontWeight="800">CORTEX-X4</text>
      <text x="45" y="33" textAnchor="middle" fill="#475569" fontSize="4">Max Performance · ~15% IPC↑ vs X3</text>
      <rect x="8" y="44" width="74" height="22" rx="3" fill="#f0fdfa" stroke="#0088A8" strokeWidth="1.5" />
      <text x="45" y="53" textAnchor="middle" fill="#0088A8" fontSize="5" fontWeight="800">CORTEX-A720</text>
      <text x="45" y="61" textAnchor="middle" fill="#475569" fontSize="4">Performance-Efficiency Tier</text>
      <rect x="8" y="72" width="74" height="22" rx="3" fill="#f0fdf4" stroke="#166534" strokeWidth="1.5" />
      <text x="45" y="81" textAnchor="middle" fill="#166534" fontSize="5" fontWeight="800">CORTEX-A520</text>
      <text x="45" y="89" textAnchor="middle" fill="#475569" fontSize="4">Ultra-Efficiency · Pure 64-bit</text>
      <rect x="90" y="16" width="46" height="78" rx="3" fill="#f8fafc" stroke="#1A365D" strokeWidth="1.5" />
      <text x="113" y="58" textAnchor="middle" fill="#1A365D" fontSize="4.5" fontWeight="800" transform="rotate(-90,113,58)">DSU-120 · L3 Cache</text>
      <line x1="82" y1="27" x2="90" y2="27" stroke="#334155" strokeWidth="1" markerEnd="url(#ab)" />
      <line x1="82" y1="55" x2="90" y2="55" stroke="#334155" strokeWidth="1" markerEnd="url(#ab)" />
      <line x1="82" y1="83" x2="90" y2="83" stroke="#334155" strokeWidth="1" markerEnd="url(#ab)" />
      <rect x="145" y="16" width="56" height="78" rx="3" fill="#fafafa" stroke="#001A4F" strokeWidth="2" />
      <text x="173" y="58" textAnchor="middle" fill="#001A4F" fontSize="4.5" fontWeight="800" transform="rotate(-90,173,58)">CMN-700 COHERENT MESH</text>
      <line x1="136" y1="55" x2="145" y2="55" stroke="#334155" strokeWidth="1" markerEnd="url(#ab)" />
      <rect x="8" y="103" width="105" height="19" rx="3" fill="#f0fdf4" stroke="#006B63" strokeWidth="1.5" />
      <text x="60" y="115" textAnchor="middle" fill="#006B63" fontSize="4.8" fontWeight="800">REALM MANAGEMENT EXT. (RME)</text>
      <line x1="113" y1="112" x2="145" y2="112" stroke="#006B63" strokeWidth="1" markerEnd="url(#ab)" />
      <rect x="8" y="128" width="105" height="19" rx="3" fill="#f8fafc" stroke="#1A365D" strokeWidth="1.5" />
      <text x="60" y="140" textAnchor="middle" fill="#1A365D" fontSize="4.8" fontWeight="800">MEM I/O · DDR5X · PCIe Gen 5</text>
      <line x1="113" y1="137" x2="145" y2="137" stroke="#1A365D" strokeWidth="1" markerEnd="url(#ab)" />
      <rect x="215" y="40" width="72" height="20" rx="3" fill="#f8fafc" stroke="#64748B" strokeWidth="1" />
      <text x="251" y="52" textAnchor="middle" fill="#475569" fontSize="4.2" fontWeight="700">EXTERNAL RAM / STORAGE</text>
      <line x1="201" y1="55" x2="215" y2="50" stroke="#64748B" strokeWidth="1" markerEnd="url(#ab)" />
      <rect x="8" y="153" width="50" height="16" rx="3" fill="#fdf4ff" stroke="#7e22ce" strokeWidth="1.2" />
      <text x="33" y="163" textAnchor="middle" fill="#7e22ce" fontSize="4.5" fontWeight="800">SME2 · ZA</text>
      <rect x="64" y="153" width="50" height="16" rx="3" fill="#fff7ed" stroke="#b45309" strokeWidth="1.2" />
      <text x="89" y="163" textAnchor="middle" fill="#b45309" fontSize="4.5" fontWeight="800">SVE2 · Z regs</text>
      <rect x="120" y="153" width="80" height="16" rx="3" fill="#f0f9ff" stroke="#0369a1" strokeWidth="1.2" />
      <text x="160" y="163" textAnchor="middle" fill="#0369a1" fontSize="4.5" fontWeight="800">PMUv3.5 · ETE Trace · BRBE</text>
    </svg>
  )
}

function CoaRegisters() {
  return (
    <svg viewBox="0 0 274 65" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ fontFamily: "'JetBrains Mono',monospace", border: '1px solid #D0DBF0', borderRadius: '4px', display: 'block', marginBottom: '4px' }}>
      <text x="6" y="12" fill="#0040C1" fontSize="5" fontWeight="900">64-BIT Xn REGISTER:</text>
      <rect x="6" y="16" width="262" height="13" rx="2" fill="#EFF6FF" stroke="#0040C1" strokeWidth="1.5" />
      <line x1="137" y1="16" x2="137" y2="29" stroke="#0040C1" strokeWidth="0.8" strokeDasharray="2,2" />
      <text x="72" y="25" textAnchor="middle" fill="#1e3a8a" fontSize="4.5" fontWeight="700">[63 ─────── 32]</text>
      <text x="202" y="25" textAnchor="middle" fill="#1e3a8a" fontSize="4.5" fontWeight="700">[31 ─────── 0]</text>
      <text x="6" y="42" fill="#1A365D" fontSize="5" fontWeight="900">32-BIT Wn ALIAS:</text>
      <rect x="138" y="44" width="130" height="10" rx="2" fill="#f0fdfa" stroke="#1A365D" strokeWidth="1.5" />
      <text x="203" y="51" textAnchor="middle" fill="#1A365D" fontSize="4" fontWeight="700">[31 ─── 0] LOWER HALF ONLY</text>
      <text x="203" y="60" textAnchor="middle" fill="#0040C1" fontSize="3.5" fontWeight="700">* WRITES TO Wn ZERO-EXTEND Xn</text>
    </svg>
  )
}

function CoaDatapath() {
  return (
    <svg viewBox="0 0 295 158" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ fontFamily: "'JetBrains Mono',monospace", border: '1px solid #D0DBF0', borderRadius: '4px', display: 'block' }}>
      <defs>
        <marker id="as" markerWidth="5" markerHeight="4" refX="4" refY="2" orient="auto">
          <path d="M0,0 L5,2 L0,4 Z" fill="#334155" />
        </marker>
      </defs>
      <rect x="4" y="8" width="40" height="22" rx="3" fill="#EFF6FF" stroke="#001A4F" strokeWidth="2" />
      <text x="24" y="18" textAnchor="middle" fill="#001A4F" fontSize="5.5" fontWeight="900">IF</text>
      <text x="24" y="26" textAnchor="middle" fill="#475569" fontSize="3.8">Fetch</text>
      <line x1="44" y1="19" x2="52" y2="19" stroke="#334155" strokeWidth="1" markerEnd="url(#as)" />
      <rect x="52" y="8" width="40" height="22" rx="3" fill="#f0f9ff" stroke="#1A365D" strokeWidth="2" />
      <text x="72" y="18" textAnchor="middle" fill="#1A365D" fontSize="5.5" fontWeight="900">ID</text>
      <text x="72" y="26" textAnchor="middle" fill="#475569" fontSize="3.8">Decode</text>
      <line x1="92" y1="19" x2="100" y2="19" stroke="#334155" strokeWidth="1" markerEnd="url(#as)" />
      <rect x="100" y="8" width="46" height="22" rx="3" fill="#f0f4ff" stroke="#0040C1" strokeWidth="2" />
      <text x="123" y="18" textAnchor="middle" fill="#0040C1" fontSize="5.5" fontWeight="900">RN</text>
      <text x="123" y="26" textAnchor="middle" fill="#475569" fontSize="3.8">Rename/ROB</text>
      <line x1="146" y1="19" x2="154" y2="19" stroke="#334155" strokeWidth="1" markerEnd="url(#as)" />
      <rect x="154" y="8" width="44" height="22" rx="3" fill="#f0fdfa" stroke="#0088A8" strokeWidth="2" />
      <text x="176" y="18" textAnchor="middle" fill="#0088A8" fontSize="5.5" fontWeight="900">IS</text>
      <text x="176" y="26" textAnchor="middle" fill="#475569" fontSize="3.8">Issue Sched</text>
      <line x1="198" y1="19" x2="206" y2="19" stroke="#334155" strokeWidth="1" markerEnd="url(#as)" />
      <rect x="206" y="8" width="38" height="22" rx="3" fill="#fffbeb" stroke="#b45309" strokeWidth="2" />
      <text x="225" y="18" textAnchor="middle" fill="#b45309" fontSize="5.5" fontWeight="900">EX</text>
      <text x="225" y="26" textAnchor="middle" fill="#475569" fontSize="3.8">Execute</text>
      <line x1="244" y1="19" x2="252" y2="19" stroke="#334155" strokeWidth="1" markerEnd="url(#as)" />
      <rect x="252" y="8" width="38" height="22" rx="3" fill="#f0fdf4" stroke="#15803d" strokeWidth="2" />
      <text x="271" y="18" textAnchor="middle" fill="#15803d" fontSize="5.5" fontWeight="900">WB</text>
      <text x="271" y="26" textAnchor="middle" fill="#475569" fontSize="3.8">Writeback</text>
      <line x1="225" y1="30" x2="225" y2="42" stroke="#b45309" strokeWidth="1" markerEnd="url(#as)" />
      <rect x="154" y="42" width="76" height="17" rx="3" fill="#f0f4ff" stroke="#1A365D" strokeWidth="1.5" />
      <text x="192" y="53" textAnchor="middle" fill="#1A365D" fontSize="4.5" fontWeight="800">INT · FP · SIMD · SVE2</text>
      <rect x="154" y="63" width="76" height="17" rx="3" fill="#f0fdfa" stroke="#0088A8" strokeWidth="1.5" />
      <text x="192" y="74" textAnchor="middle" fill="#0088A8" fontSize="4.5" fontWeight="800">LOAD/STORE · SME2 · ZA</text>
      <line x1="192" y1="59" x2="192" y2="63" stroke="#334155" strokeWidth="0.8" />
      <rect x="4" y="42" width="60" height="17" rx="3" fill="#f0fdf4" stroke="#166534" strokeWidth="1.5" />
      <text x="34" y="53" textAnchor="middle" fill="#166534" fontSize="4.5" fontWeight="800">L1 I-Cache 64KB</text>
      <line x1="24" y1="30" x2="24" y2="42" stroke="#166534" strokeWidth="1" markerEnd="url(#as)" />
      <rect x="4" y="63" width="60" height="17" rx="3" fill="#f0fdf4" stroke="#166534" strokeWidth="1.5" />
      <text x="34" y="74" textAnchor="middle" fill="#166534" fontSize="4.5" fontWeight="800">L1 D-Cache 64KB</text>
      <line x1="154" y1="72" x2="64" y2="72" stroke="#166534" strokeWidth="0.8" markerEnd="url(#as)" />
      <rect x="70" y="42" width="56" height="17" rx="3" fill="#fdf4ff" stroke="#7e22ce" strokeWidth="1.5" />
      <text x="98" y="53" textAnchor="middle" fill="#7e22ce" fontSize="4.5" fontWeight="800">Branch Predictor</text>
      <line x1="72" y1="30" x2="72" y2="42" stroke="#7e22ce" strokeWidth="1" markerEnd="url(#as)" />
      <rect x="4" y="90" width="286" height="16" rx="3" fill="#001A4F" />
      <text x="147" y="101" textAnchor="middle" fill="#fff" fontSize="5" fontWeight="900">COMMIT (IN-ORDER RETIREMENT VIA ROB)</text>
      <line x1="271" y1="80" x2="271" y2="90" stroke="#334155" strokeWidth="1" markerEnd="url(#as)" />
      <rect x="4" y="115" width="118" height="15" rx="3" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
      <text x="63" y="125" textAnchor="middle" fill="#475569" fontSize="4.2" fontWeight="700">L2 Cache · 512KB–2MB (Private)</text>
      <rect x="130" y="115" width="160" height="15" rx="3" fill="#f8fafc" stroke="#001A4F" strokeWidth="1.5" />
      <text x="210" y="125" textAnchor="middle" fill="#001A4F" fontSize="4.2" fontWeight="700">DSU-120 Shared L3 · CMN-700 Mesh</text>
      <text x="4" y="145" fill="#94a3b8" fontSize="3.8">OOO: Rename eliminates WAR/WAW hazards · ROB holds 384 in-flight instr · Retire restores program order</text>
    </svg>
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
      <tbody>
        {[
          ["X0 – X7", "W0–W7", "Function arguments & return values"],
          ["X8 – X18", "W8–W18", "Caller-saved; X8=XR, X16/X17=IP0/IP1"],
          ["X19 – X28", "W19–W28", "Callee-saved (preserved across calls)"],
          ["X29 / X30", "FP / LR", "Frame Pointer / Link Register"],
          ["V0 – V31", "Q/D/S/H/B", "SIMD & FP — 128-bit vector banks"],
          ["Z0 – Z31", "—", "SVE2 scalable vectors (128–2048b, impl-defined)"],
          ["ZA Tile", "—", "SME2 matrix accumulator array"]
        ].map(([reg, alias, purpose], idx) => (
          <tr key={idx}>
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

function ComparisonTable() {
  return (
    <table className="cmp">
      <thead>
        <tr>
          <th>Feature</th>
          <th>ARMv8.x</th>
          <th>ARMv9.2-A</th>
          <th>Advantage</th>
        </tr>
      </thead>
      <tbody>
        {[
          ["Security Model", "2 states (Sec/NS)", "4 states via RME", "✔ Confidential Compute"],
          ["SIMD / Vector", "NEON · fixed 128-bit", "SVE2 · 128–2048b", "✔ HPC / AI scalability"],
          ["Matrix / AI", "No matrix engine", "SME2 · ZA GEMM", "✔ On-device AI/ML"],
          ["Memory Safety", "Software only", "MTE hardware tags", "✔ Near-zero overhead"],
          ["Anti-Exploit", "PAC (v8.3+) partial", "PAC+BTI+MTE+RME", "✔ Multi-layer defence"],
          ["Concurrency", "No hardware TM", "TME atomic txns", "✔ Faster lock-free code"],
          ["ISA Encoding", "32-bit A64 only", "+SVE2/SME2 enc.", "✔ Broader compute"]
        ].map(([feat, v8, v9, adv], idx) => (
          <tr key={idx}>
            <td className="cprop">{feat}</td>
            <td className="cv8">{v8}</td>
            <td className="cv9">{v9}</td>
            <td className="cwin">{adv}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
      <div className="team-no">Team No :</div>
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
